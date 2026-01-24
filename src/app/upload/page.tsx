'use client';

import React, { useState, useEffect } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { db } from '@/core/storage/indexedDb';
import { Document } from '@/types';
import Link from 'next/link';

export default function UploadPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      await db.initialize();
      const docs = await db.getAllDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (doc: Document) => {
    setDocuments([...documents, doc]);
    setMessage({ type: 'success', text: `"${doc.name}" uploaded successfully!` });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUploadError = (error: string) => {
    setMessage({ type: 'error', text: error });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        await db.deleteDocument(id);
        setDocuments(documents.filter(doc => doc.id !== id));
        setMessage({ type: 'success', text: 'Document deleted successfully' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete document' });
      }
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">Upload Study Materials</h1>
      <p className="text-gray-600 mb-8">
        Upload PDF, DOCX, or TXT files to get started
      </p>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <FileUploader
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      {!loading && documents.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <div key={doc.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">
                    {doc.fileType === 'pdf' ? '📕' : doc.fileType === 'docx' ? '📗' : '📄'}
                  </div>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 truncate">{doc.name}</h3>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  {doc.sections.length} sections • {(doc.size / 1024).toFixed(1)} KB
                </p>
                <Link
                  href={`/study/${doc.id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Study Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && documents.length === 0 && (
        <div className="mt-12 text-center text-gray-500">
          <p>No documents uploaded yet. Upload one to get started!</p>
        </div>
      )}
    </main>
  );
}
