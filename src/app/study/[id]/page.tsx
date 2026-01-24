'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/core/storage/indexedDb';
import { Summarizer, QuizGenerator, KeywordExtractor, Explainer } from '@/core/nlp/engine';
import { Document, Summary, Flashcard, Quiz } from '@/types';
import { SummaryViewer } from '@/components/SummaryViewer';
import { FlashcardDeck } from '@/components/FlashcardDeck';
import { QuizEngine } from '@/components/QuizEngine';
import Link from 'next/link';

export default function StudyPage() {
  const params = useParams();
  const documentId = params?.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'summary' | 'flashcards' | 'quiz' | 'explain'>('overview');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId) {
      loadDocument();
    }
  }, [documentId]);

  const loadDocument = async () => {
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
  };

  const generateInitialContent = (doc: Document) => {
    try {
      // Generate summary
      const summaryResult = Summarizer.summarize(doc.content, 0.25);
      if (summaryResult?.text) {
        setSummary({
          id: `summary-${doc.id}`,
          documentId: doc.id,
          content: summaryResult.text,
          createdAt: new Date(),
          type: 'paragraph',
        });
      }

      // Generate keywords
      const kw = KeywordExtractor.extractKeywords(doc.content, 15);
      if (kw && kw.length > 0) {
        setKeywords(kw);
      }

      // Generate flashcards
      const flashcardData = QuizGenerator.generateFlashcards(doc.content, 10);
      if (flashcardData && flashcardData.length > 0) {
        const fcards: Flashcard[] = flashcardData.map((fc, index) => ({
          id: `fc-${doc.id}-${index}`,
          documentId: doc.id,
          question: fc.question,
          answer: fc.answer,
          difficulty: 'medium',
          createdAt: new Date(),
          reviewed: 0,
        }));
        setFlashcards(fcards);
      }

      // Generate quiz
      const quizResult = QuizGenerator.generateMCQs(doc.content, 5);
      if (quizResult?.questions && quizResult.questions.length > 0) {
        setQuiz({
          id: `quiz-${doc.id}`,
          documentId: doc.id,
          title: `Quiz: ${doc.name}`,
          questions: quizResult.questions,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error generating study content:', error);
    }
  };

  const renderExplanation = () => {
    if (!document) return null;

    const explanation = Explainer.explain(document.content);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Simplified Explanation</h3>
          <div className="bg-white rounded-lg shadow p-6 text-gray-700 leading-relaxed">
            {explanation.simplified}
          </div>
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
              onClick={() => setActiveTab(tab.key as any)}
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
            <QuizEngine quiz={quiz} />
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
