'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudyPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to upload page where users can select a document to study
    router.push('/upload');
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center">
        <div className="inline-block animate-spin text-4xl">⏳</div>
        <p className="text-gray-600 mt-4">Redirecting to study materials...</p>
      </div>
    </main>
  );
}
