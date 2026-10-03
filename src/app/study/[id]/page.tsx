'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/core/storage/indexedDb';
import { Summarizer, QuizGenerator, KeywordExtractor, Explainer } from '@/core/nlp/engine';
import { Document, Summary, Flashcard, Quiz, QuizQuestion } from '@/types';
import { SummaryViewer, TextModeViewer } from '@/components/SummaryViewer';
import { FlashcardDeck } from '@/components/FlashcardDeck';
import { QuizEngine } from '@/components/QuizEngine';
import { TextUtils } from '@/utils/textUtils';
import Link from 'next/link';

export default function StudyPage() {
  const params = useParams();
  const documentId = params?.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'summary' | 'flashcards' | 'quiz' | 'explain'>('overview');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [questionPool, setQuestionPool] = useState<QuizQuestion[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizExhausted, setQuizExhausted] = useState(false);

  const generateInitialContent = useCallback((doc: Document) => {
    try {
      // Generate summary
      const summaryResult = Summarizer.summarize(doc.content, 0.25);
      if (summaryResult?.text) {
        setSummary({
          id: `summary-${doc.id}`,
          documentId: doc.id,
          content: summaryResult.text,
          bulletPoints: summaryResult.bulletPoints,
          createdAt: new Date(),
          type: 'paragraph',
        });
      }

      // Generate keywords
      const kw = KeywordExtractor.extractKeywords(doc.content, 15);
      if (kw && kw.length > 0) {
        setKeywords(kw);
      }

      // Keep flashcards and quiz rounds on the same topic-question set.
      const questions = QuizGenerator.generateMCQs(doc.content, 10).questions;
      setQuestionPool(questions);
      if (questions.length > 0) {
        const fcards: Flashcard[] = questions.map((question, index) => ({
          id: `fc-${doc.id}-${index}`,
          documentId: doc.id,
          question: question.question,
          answer: question.options[question.correctAnswer],
          difficulty: 'medium',
          createdAt: new Date(),
          reviewed: 0,
        }));
        setFlashcards(fcards);
      }

    } catch (error) {
      console.error('Error generating study content:', error);
    }
  }, []);

  const loadDocument = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await db.initialize();
      const doc = await db.getDocument(documentId);
      if (doc) {
        setDocument(doc);
        generateInitialContent(doc);
      } else {
        setError('Document not found in database');
      }
    } catch (error) {
      console.error('Failed to load document:', error);
      setError(`Failed to load document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [documentId, generateInitialContent]);

  useEffect(() => {
    if (documentId) {
      void loadDocument();
    }
  }, [documentId, loadDocument]);

  const generateQuiz = (doc: Document, startFresh = false) => {
    const historyKey = `quiz-history-${doc.id}`;
    let usedQuestionIds: string[] = [];
    try {
      const storedHistory = startFresh ? null : localStorage.getItem(historyKey);
      const parsedHistory: unknown = storedHistory ? JSON.parse(storedHistory) : [];
      if (Array.isArray(parsedHistory)) {
        usedQuestionIds = parsedHistory.filter((id): id is string => typeof id === 'string');
      }
    } catch (storageError) {
      console.warn('Quiz history could not be read:', storageError);
    }

    const excluded = new Set(usedQuestionIds);
    const availableQuestions = questionPool.filter(question => !excluded.has(question.id));
    for (let index = availableQuestions.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [availableQuestions[index], availableQuestions[swapIndex]] =
        [availableQuestions[swapIndex], availableQuestions[index]];
    }
    const questions = availableQuestions.slice(0, 5);
    if (questions.length === 0) {
      setQuiz(null);
      setQuizExhausted(true);
      return;
    }

    try {
      localStorage.setItem(
        historyKey,
        JSON.stringify([...new Set([...usedQuestionIds, ...questions.map(question => question.id)])])
      );
    } catch (storageError) {
      console.warn('Quiz history could not be saved:', storageError);
    }

    setQuiz({
      id: `quiz-${doc.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      documentId: doc.id,
      title: `Quiz: ${doc.name}`,
      questions,
      createdAt: new Date(),
    });
    setQuizExhausted(false);
  };

  const handleTabChange = (tab: 'overview' | 'summary' | 'flashcards' | 'quiz' | 'explain') => {
    if (tab === 'quiz' && document) {
      generateQuiz(document);
    }
    setActiveTab(tab);
  };

  const renderExplanation = () => {
    if (!document) return null;

    const explanation = Explainer.explain(document.content);

    return (
      <div className="space-y-8">
        <div>
          <TextModeViewer
            title="Simplified Explanation"
            content={explanation.simplified}
            bulletPoints={TextUtils.extractSentences(explanation.simplified)}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Terms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {explanation.keyTerms.map((term, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="font-semibold text-gray-800">{term}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Examples</h3>
          <ul className="space-y-2">
            {explanation.examples.map((example, index) => (
              <li key={index} className="flex gap-3 bg-white rounded-lg shadow p-4">
                <span className="text-blue-500 font-bold">→</span>
                <span className="text-gray-700">{example}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading document...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">❌ {error}</p>
          <Link href="/upload" className="text-blue-600 hover:text-blue-800 mb-4 inline-block block">
            ← Back to Documents
          </Link>
          <p className="text-gray-600 text-sm">Document ID: {documentId}</p>
        </div>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Document not found</p>
          <Link href="/upload" className="text-blue-600 hover:text-blue-800">
            ← Back to Documents
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/upload" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Documents
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{document.name}</h1>
        <p className="text-gray-600 mt-2">
          {document.sections.length} sections • {(document.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <div className="border-b border-gray-300 mb-8">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'overview', label: '📋 Overview' },
            { key: 'summary', label: '📝 Summary' },
            { key: 'flashcards', label: '🎴 Flashcards' },
            { key: 'quiz', label: '❓ Quiz' },
            { key: 'explain', label: '💡 Explain' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key as typeof activeTab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Keywords</h3>
              {keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No keywords extracted</p>
              )}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Document Info</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Type:</strong> {document.fileType.toUpperCase()}</p>
                <p><strong>Uploaded:</strong> {new Date(document.uploadedAt).toLocaleDateString()}</p>
                <p><strong>Content Length:</strong> {document.content.length} characters</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          summary ? (
            <SummaryViewer summary={summary} />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">📝 Summary could not be generated. Try uploading a longer document.</p>
            </div>
          )
        )}

        {activeTab === 'flashcards' && (
          flashcards.length > 0 ? (
            <FlashcardDeck flashcards={flashcards} />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">🎴 Flashcards could not be generated. Try uploading a document with more content.</p>
            </div>
          )
        )}

        {activeTab === 'quiz' && (
          quiz ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">Questions focus on the main topic and change each time you open a new quiz.</p>
                </div>
                <button
                  onClick={() => generateQuiz(document)}
                  className="rounded-md bg-blue-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  New quiz
                </button>
              </div>
              <QuizEngine key={quiz.id} quiz={quiz} onRestart={() => generateQuiz(document)} />
            </div>
          ) : quizExhausted ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900">You have seen every available question</h2>
              <p className="mt-2 text-gray-700">Start a fresh round to reuse this material.</p>
              <button
                onClick={() => generateQuiz(document, true)}
                className="mt-5 rounded-md bg-blue-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Start fresh round
              </button>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-gray-700">❓ Quiz could not be generated. Try uploading a document with more structured content.</p>
            </div>
          )
        )}

        {activeTab === 'explain' && (
          renderExplanation()
        )}
      </div>
    </main>
  );
}
