'use client';

import React, { useState } from 'react';
import { Summary } from '@/types';
import { TextUtils } from '@/utils/textUtils';

interface SummaryViewerProps {
  summary: Summary;
}

interface TextModeViewerProps {
  title: string;
  content: string;
  bulletPoints?: string[];
  footer?: React.ReactNode;
}

export const TextModeViewer: React.FC<TextModeViewerProps> = ({
  title,
  content,
  bulletPoints,
  footer,
}) => {
  const [viewMode, setViewMode] = useState<'paragraph' | 'bullet'>('paragraph');
  const points = bulletPoints?.length ? bulletPoints : TextUtils.extractSentences(content);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex gap-2" role="group" aria-label={`${title} format`}>
          <button
            type="button"
            onClick={() => setViewMode('paragraph')}
            aria-pressed={viewMode === 'paragraph'}
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'paragraph'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Paragraph
          </button>
          <button
            type="button"
            onClick={() => setViewMode('bullet')}
            aria-pressed={viewMode === 'bullet'}
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
          <p>{content}</p>
        ) : (
          <ul className="space-y-3" aria-label={`${title} bullet points`}>
            {points.map((point, index) => (
              <li key={`${index}-${point}`} className="flex items-start gap-3">
                <span className="mt-0.5 text-blue-600" aria-hidden="true">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {footer && (
        <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export const SummaryViewer: React.FC<SummaryViewerProps> = ({ summary }) => (
  <div>
    <TextModeViewer
      title="Summary"
      content={summary.content}
      bulletPoints={summary.bulletPoints}
      footer={`Created ${new Date(summary.createdAt).toLocaleDateString()}`}
    />
  </div>
);
