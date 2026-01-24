'use client';

import React from 'react';
import { Summary } from '@/types';

interface SummaryViewerProps {
  summary: Summary;
}

export const SummaryViewer: React.FC<SummaryViewerProps> = ({ summary }) => {
  const [viewMode, setViewMode] = React.useState<'paragraph' | 'bullet'>('paragraph');

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('paragraph')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'paragraph'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Paragraph
          </button>
          <button
            onClick={() => setViewMode('bullet')}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'bullet'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bullets
          </button>
        </div>
      </div>

      <div className="mt-6 text-gray-700 leading-relaxed">
        {viewMode === 'paragraph' ? (
          <p>{summary.content}</p>
        ) : (
          <ul className="space-y-2">
            {summary.content.split('.').map((point, index) => (
              point.trim() && (
                <li key={index} className="flex gap-3">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{point.trim()}.</span>
                </li>
              )
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Created {new Date(summary.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};
