'use client';

import React, { useState } from 'react';
import { Flashcard } from '@/types';

interface FlashcardDeckProps {
  flashcards: Flashcard[];
  onCardReview?: (cardId: string, isCorrect: boolean) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  flashcards,
  onCardReview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (flashcards.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No flashcards available
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkCorrect = () => {
    onCardReview?.(currentCard.id, true);
    handleNext();
  };

  const handleMarkIncorrect = () => {
    onCardReview?.(currentCard.id, false);
    handleNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">
            {currentCard.difficulty}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div
        className="perspective cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-64 transition-transform duration-500 transform-gpu ${
            isFlipped ? 'scale-x-[-1]' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="text-white text-center">
              <p className="text-sm opacity-75 mb-2">QUESTION</p>
              <p className="text-2xl font-bold">{currentCard.question}</p>
            </div>
          </div>

          <div
            className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-8 flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-white text-center">
              <p className="text-sm opacity-75 mb-2">ANSWER</p>
              <p className="text-xl font-bold">{currentCard.answer}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Click card to flip
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={handleMarkIncorrect}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          ✗ Incorrect
        </button>
        <button
          onClick={handleMarkCorrect}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          ✓ Correct
        </button>
        <button
          onClick={handleNext}
          className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          {currentIndex === flashcards.length - 1 ? 'Review again' : 'Next →'}
        </button>
      </div>
    </div>
  );
};
