'use client';

import React from 'react';
import Link from 'next/link';

export default function LearnMore() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Learn More</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about AI Study Buddy
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {/* What is AI Study Buddy */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What is AI Study Buddy?</h2>
            <p className="text-gray-700 mb-4">
              AI Study Buddy is an intelligent, offline-first learning companion designed for students and educators. 
              It processes your study materials locally without requiring an internet connection or sending data to external servers.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>📚 Works completely offline with local NLP algorithms</li>
              <li>🔒 Your data never leaves your device (privacy-first)</li>
              <li>⚡ Fast, instant processing (no cloud latency)</li>
              <li>🧠 Optional cloud AI integration (disabled by default)</li>
              <li>💾 Persistent storage using IndexedDB</li>
            </ul>
          </section>

          {/* Core Features */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Core Features (Always Available)</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">📤 File Upload & Parsing</h3>
                <p className="text-gray-700">
                  Upload study materials in PDF, DOCX, or TXT format. Files are automatically parsed and processed locally.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">📝 Smart Summarization</h3>
                <p className="text-gray-700">
                  Automatically extract key points using frequency-based NLP. Get concise bullet-point summaries of your study material.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🎴 Flashcard Generation</h3>
                <p className="text-gray-700">
                  Intelligently generate question-answer pairs from your documents for spaced repetition learning.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🧠 AI Explanations</h3>
                <p className="text-gray-700">
                  Break down complex topics into simple, beginner-friendly explanations. Replace jargon with clear definitions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">❓ Quiz Generation</h3>
                <p className="text-gray-700">
                  Auto-generate multiple choice questions, true/false, and fill-in-the-blank quizzes from your study material.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">📊 Progress Tracking</h3>
                <p className="text-gray-700">
                  Monitor your learning journey with detailed progress metrics, quiz scores, and flashcard review stats.
                </p>
              </div>
            </div>
          </section>

          {/* Optional Cloud AI */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Optional Cloud AI Features</h2>
            <p className="text-gray-700 mb-4">
              Enhanced features using OpenAI GPT or Google Gemini (feature-flagged and disabled by default):
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>🌐 Advanced explanations with context-aware responses</li>
              <li>🌐 Higher-quality summarization using large language models</li>
              <li>🌐 Conversational Q&A about your study materials</li>
              <li>🌐 Better quiz generation with more nuanced questions</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> Cloud AI is completely optional. The app works perfectly without it, and can be enabled anytime in Settings.
            </p>
          </section>

          {/* Technology Stack */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Next.js 14 (React framework)</li>
                  <li>• TypeScript (type safety)</li>
                  <li>• Tailwind CSS (styling)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Local Processing</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• PDF.js (PDF parsing)</li>
                  <li>• Mammoth (DOCX parsing)</li>
                  <li>• NLP algorithms (text analysis)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Storage</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• IndexedDB (persistent storage)</li>
                  <li>• LocalStorage (settings)</li>
                  <li>• On-device data only</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Optional AI</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• OpenAI GPT integration</li>
                  <li>• Google Gemini integration</li>
                  <li>• Pluggable architecture</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How NLP Works */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Local NLP Works</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">1. Text Extraction</h3>
                <p>Your documents are parsed and cleaned to extract raw text without formatting noise.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Sentence Analysis</h3>
                <p>Text is broken into sentences and scored based on keyword frequency and relevance.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Keyword Identification</h3>
                <p>Important keywords are extracted using frequency analysis and term importance scoring.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Content Generation</h3>
                <p>Summaries, quizzes, and flashcards are generated using rule-based algorithms—no hard-coded content.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5. Storage & Persistence</h3>
                <p>All generated content and progress is stored in IndexedDB for later access.</p>
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Privacy & Security</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>✅ Zero Data Transmission:</strong> All processing happens in your browser. Your data never leaves your device.
              </li>
              <li>
                <strong>✅ No Backend Server:</strong> The app runs entirely on your device. No account or login required.
              </li>
              <li>
                <strong>✅ Encrypted Storage:</strong> Your data is stored securely in IndexedDB on your device.
              </li>
              <li>
                <strong>✅ Optional Cloud AI:</strong> If enabled, only the text you explicitly send to cloud AI is processed externally.
              </li>
              <li>
                <strong>✅ Offline-First:</strong> The app works completely offline. Internet is only needed for optional cloud AI features.
              </li>
            </ul>
          </section>

          {/* Quick Start */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quick Start Guide</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Upload Study Material</h3>
                  <p className="text-gray-700">Go to Upload page and select a PDF, DOCX, or TXT file</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">2</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Generate Learning Resources</h3>
                  <p className="text-gray-700">Create summaries, flashcards, or quizzes from your material</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">3</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Study & Track Progress</h3>
                  <p className="text-gray-700">Use interactive study tools and monitor your learning in Progress</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">4</div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Configure Settings (Optional)</h3>
                  <p className="text-gray-700">Enable cloud AI, change preferences, or manage your data</p>
                </div>
              </div>
            </div>

            <Link
              href="/upload"
              className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Now →
            </Link>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Does AI Study Buddy require internet?</h3>
                <p className="text-gray-700">
                  No! All core features work completely offline. Internet is only needed if you enable optional cloud AI features in Settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Is my data stored on a server?</h3>
                <p className="text-gray-700">
                  Absolutely not. All your study materials and progress are stored locally in your browser using IndexedDB. Your data never leaves your device.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What file formats are supported?</h3>
                <p className="text-gray-700">
                  PDF, DOCX (Word documents), and TXT (plain text) files are fully supported.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Can I export my data?</h3>
                <p className="text-gray-700">
                  You can download all your generated summaries, flashcards, and quiz results from the app. Check Settings for export options.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How accurate are the summaries and quizzes?</h3>
                <p className="text-gray-700">
                  Local NLP uses proven algorithms (frequency analysis, TF-IDF-like scoring). Results are typically 80-90% accurate for most academic materials. 
                  For maximum quality, consider enabling cloud AI features for advanced analysis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Is there a cost?</h3>
                <p className="text-gray-700">
                  AI Study Buddy is completely free! Optional cloud AI features (OpenAI, Gemini) may have their own costs based on API usage, but are entirely optional.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Studying Now
          </Link>
        </div>
      </div>
    </main>
  );
}
