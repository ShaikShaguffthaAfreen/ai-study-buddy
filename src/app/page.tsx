import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          AI Study Buddy
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your intelligent offline-first learning companion
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-8">
          Upload study materials, generate summaries, create flashcards, take quizzes,
          and track your progress—all locally. Optional cloud AI integration available.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon="📤"
          title="Upload Materials"
          description="Support for PDF, DOCX, and TXT files"
          href="/upload"
        />
        <FeatureCard
          icon="✍️"
          title="Study Tools"
          description="Summaries, flashcards, and quizzes"
          href="/upload"
        />
        <FeatureCard
          icon="📊"
          title="Track Progress"
          description="Monitor your learning journey"
          href="/progress"
        />
        <FeatureCard
          icon="🧠"
          title="AI Explanations"
          description="Simplify complex topics locally"
          href="/upload"
        />
        <FeatureCard
          icon="⚙️"
          title="Settings"
          description="Configure AI and preferences"
          href="/settings"
        />
        <FeatureCard
          icon="🚀"
          title="Learn More"
          description="Read documentation and guides"
          href="/learn"
        />
      </div>

      <div className="text-center">
        <Link
          href="/upload"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Get Started Now
        </Link>
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">1</div>
            </div>
            <div>
              <h3 className="font-semibold">Upload Your Study Material</h3>
              <p>Upload PDF, DOCX, or TXT files directly to your device</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">2</div>
            </div>
            <div>
              <h3 className="font-semibold">Generate Learning Resources</h3>
              <p>Automatically create summaries, flashcards, and quizzes</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">3</div>
            </div>
            <div>
              <h3 className="font-semibold">Study Effectively</h3>
              <p>Use interactive tools to learn and reinforce knowledge</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">4</div>
            </div>
            <div>
              <h3 className="font-semibold">Track Your Progress</h3>
              <p>Monitor learning metrics and improvement over time</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  href: string
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const content = (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return <Link href={href}>{content}</Link>
}
