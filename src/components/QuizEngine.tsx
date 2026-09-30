'use client';

import React, { useState } from 'react';
import { Quiz } from '@/types';

interface QuizEngineProps {
  quiz: Quiz;
  onQuizComplete?: (results: { score: number; totalQuestions: number }) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quiz,
  onQuizComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    const score = userAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length;
    setShowResults(true);
    onQuizComplete?.({ score, totalQuestions: quiz.questions.length });
  };

  if (showResults) {
    const score = userAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length;
    const percentage = Math.round(
      (score / quiz.questions.length) * 100
    );

    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Quiz Complete!
        </h2>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-600">
            You got {score} out of {quiz.questions.length} questions correct
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {quiz.questions.map((question, index) => {
            const isCorrect = userAnswers[index] === question.correctAnswer;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl">
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {question.question}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          {userAnswers[currentQuestionIndex] !== null && (
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded">
              Answered
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-colors ${
                userAnswers[currentQuestionIndex] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}
                >
                  {userAnswers[currentQuestionIndex] === index && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIndex] === null}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestionIndex === quiz.questions.length - 1
              ? 'Finish'
              : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};
