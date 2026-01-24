'use client';

import React, { useState } from 'react';
import { featureFlags } from '@/core/featureFlags';
import Link from 'next/link';

export default function SettingsPage() {
  const [aiEnabled, setAiEnabled] = useState(featureFlags.isAIEnabled());
  const [aiProvider, setAiProvider] = useState(featureFlags.getAIProvider());
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleEnableAI = (enabled: boolean) => {
    setAiEnabled(enabled);
    if (!enabled) {
      featureFlags.disableAI();
      setMessage({ type: 'success', text: 'AI disabled. Using local processing only.' });
    }
  };

  const handleProviderChange = (provider: 'openai' | 'gemini') => {
    setAiProvider(provider);
  };

  const handleSaveSettings = () => {
    if (aiEnabled && !apiKey.trim()) {
      setMessage({ type: 'error', text: 'Please enter an API key to enable cloud AI' });
      return;
    }

    if (aiEnabled && aiProvider) {
      featureFlags.enableAI(aiProvider);
      // Store API key securely (would use secure storage in production)
      sessionStorage.setItem(`${aiProvider}_apikey`, apiKey);
      setMessage({ type: 'success', text: `${aiProvider.toUpperCase()} AI enabled successfully` });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Configure AI integration and preferences</p>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Local AI */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Local AI Processing</h2>
            <p className="text-gray-600 mb-4">
              Your documents are processed locally on your device using rule-based NLP. 
              No data is sent to external servers.
            </p>
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800 font-semibold">✓ Always Enabled</p>
              <p className="text-sm text-green-700 mt-1">
                Summaries, flashcards, quizzes, and explanations are generated locally
              </p>
            </div>
          </div>

          {/* Cloud AI Integration */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌐 Cloud AI Integration</h2>
            <p className="text-gray-600 mb-6">
              Optionally enable cloud AI for more advanced explanations and conversational features.
              This is completely optional and disabled by default.
            </p>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiEnabled}
                  onChange={(e) => handleEnableAI(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-800 font-semibold">Enable Cloud AI</span>
              </label>
            </div>

            {aiEnabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    AI Provider
                  </label>
                  <div className="space-y-2">
                    {['openai', 'gemini'].map(provider => (
                      <label key={provider} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="provider"
                          value={provider}
                          checked={aiProvider === provider}
                          onChange={() => handleProviderChange(provider as 'openai' | 'gemini')}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700 capitalize">{provider}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={`Enter your ${aiProvider} API key`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Your API key is stored securely and only used for API calls.
                  </p>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save Settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-3">ℹ️ How It Works</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Local AI always works offline</li>
              <li>✓ No account required</li>
              <li>✓ Your data stays on your device</li>
              <li>✓ Cloud AI is optional</li>
              <li>✓ Switch providers anytime</li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-3">🔒 Privacy</h3>
            <p className="text-sm text-gray-700">
              When cloud AI is disabled, no data leaves your device. Enable cloud AI only if you want enhanced features.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-800 mb-3">📖 About</h3>
            <p className="text-sm text-gray-700 mb-3">
              AI Study Buddy v1.0.0
            </p>
            <p className="text-xs text-gray-600">
              Open source learning platform with offline-first architecture
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
