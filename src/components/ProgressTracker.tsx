'use client';

import React from 'react';
import { LearningProgress } from '@/types';

interface ProgressTrackerProps {
  progress: LearningProgress | null;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
}) => {
  if (!progress) {
    return (
      <div className="w-full bg-gray-100 rounded-lg p-6 text-center text-gray-500">
        No progress data available yet
      </div>
    );
  }

  const stats = [
    {
      label: 'Reading Progress',
      value: Math.round(progress.readingProgress),
      unit: '%',
      color: 'bg-blue-500',
    },
    {
      label: 'Flashcards Reviewed',
      value: progress.flashcardsReviewed,
      unit: '',
      color: 'bg-purple-500',
    },
    {
      label: 'Quizzes Completed',
      value: progress.quizzesCompleted,
      unit: '',
      color: 'bg-green-500',
    },
    {
      label: 'Average Score',
      value: Math.round(progress.averageScore),
      unit: '%',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 text-center"
          >
            <div className={`${stat.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl`}>
              {stat.value}
              {stat.unit}
            </div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Learning Stats</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="font-medium">
              {new Date(progress.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Study Sessions:</span>
            <span className="font-medium">
              {progress.flashcardsReviewed + progress.quizzesCompleted}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Learning Streak:</span>
            <span className="font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
