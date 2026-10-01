import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PwaRegistration from './pwa-registration'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Study Buddy - Learn Smarter',
  description: 'Offline-first AI-powered study companion with local NLP and optional cloud AI integration',
  keywords: 'study, learning, AI, flashcards, summaries, quizzes',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Study Buddy',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/study-buddy.svg',
    apple: '/icons/study-buddy.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#f6f7f1]">
          {children}
        </div>
        <PwaRegistration />
      </body>
    </html>
  )
}
