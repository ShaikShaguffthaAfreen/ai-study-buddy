// Type definitions for the application
export interface Document {
  id: string;
  name: string;
  content: string;
  fileType: 'pdf' | 'docx' | 'txt';
  uploadedAt: Date;
  size: number;
  sections: DocumentSection[];
}

export interface DocumentSection {
  id: string;
  documentId: string;
  title: string;
  content: string;
  order: number;
}

export interface Summary {
  id: string;
  documentId: string;
  content: string;
  bulletPoints?: string[];
  createdAt: Date;
  type: 'bullet' | 'paragraph';
}

export interface Flashcard {
  id: string;
  documentId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  reviewed: number;
}

export interface Quiz {
  id: string;
  documentId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: Date;
  completedAt?: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  userAnswer?: number;
}

export interface LearningProgress {
  id: string;
  documentId: string;
  readingProgress: number; // 0-100
  flashcardsReviewed: number;
  quizzesCompleted: number;
  averageScore: number;
  lastUpdated: Date;
}

export interface ParseResult {
  success: boolean;
  content: string;
  sections?: DocumentSection[];
  error?: string;
}

export interface ExplanationResult {
  simplified: string;
  keyTerms: string[];
  examples: string[];
}

export interface SummaryResult {
  text: string;
  bulletPoints: string[];
}

export interface QuizGenerationResult {
  questions: QuizQuestion[];
  totalQuestions: number;
}

export interface AIProviderConfig {
  enabled: boolean;
  provider: 'openai' | 'gemini' | null;
  apiKey?: string;
}

export interface StorageSchema {
  documents: Document[];
  sections: DocumentSection[];
  summaries: Summary[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  progress: LearningProgress[];
}
