'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/core/storage/indexedDb';
import { ProgressTracker } from '@/components/ProgressTracker';
import { LearningProgress, Document } from '@/types';
import Link from 'next/link';

export default function ProgressPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDocId) {
      loadProgress(selectedDocId);
    }
  }, [selectedDocId]);

  const loadData = async () => {
    try {
      await db.initialize();
      const docs = await db.getAllDocuments();
      setDocuments(docs);
      if (docs.length > 0) {
        setSelectedDocId(docs[0].id);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async (docId: string) => {
    try {
      const prog = await db.getProgress(docId);
      if (prog) {
        setProgress(prog);
      } else {
        // Initialize progress for new document
        const newProgress: LearningProgress = {
          id: `progress-${docId}`,
          documentId: docId,
          readingProgress: 0,
          flashcardsReviewed: 0,
          quizzesCompleted: 0,
          averageScore: 0,
          lastUpdated: new Date(),
        };
        setProgress(newProgress);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-4">Loading progress data...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Learning Progress</h1>
      <p className="text-gray-600 mb-8">Track your study statistics and improvements</p>

      {documents.length === 0 ? (
        <div className="text-center bg-white rounded-lg shadow p-8">
          <p className="text-gray-600 mb-4">No documents uploaded yet</p>
          <Link href="/upload" className="text-blue-600 hover:text-blue-800 font-semibold">
            Upload a document to get started
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-gray-800 mb-4">Documents</h3>
              <div className="space-y-2">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left px-4 py-2 rounded transition-colors ${
                      selectedDocId === doc.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <p className="font-semibold truncate">{doc.name}</p>
                    <p className="text-xs opacity-75">
                      {doc.sections.length} sections
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {progress && <ProgressTracker progress={progress} />}
          </div>
        </div>
      )}
    </main>
  );
}
