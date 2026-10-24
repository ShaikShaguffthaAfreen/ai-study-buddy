'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { aiRouter } from '@/ai/llm.adapter';
import { answerStudyQuestion } from '@/core/nlp/questionAnswer';
import { featureFlags } from '@/core/featureFlags';
import { KeywordExtractor } from '@/core/nlp/engine';
import { ChatMessage, Document } from '@/types';

interface StudyChatProps {
  document: Document;
}

export const StudyChat: React.FC<StudyChatProps> = ({ document }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cloudAIEnabled, setCloudAIEnabled] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const mainTopic = KeywordExtractor.extractConcepts(document.content, 1)[0] || 'your material';

  useEffect(() => {
    try {
      const provider = featureFlags.getAIProvider();
      setCloudAIEnabled(Boolean(
        featureFlags.isAIEnabled() && provider && sessionStorage.getItem(`${provider}_apikey`)
      ));
    } catch {
      setCloudAIEnabled(false);
    }
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  const askQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim();
    if (!question || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: question };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setIsLoading(true);

    let answer: string;
    try {
      const flags = featureFlags.getFlags();
      const provider = flags.enableAI ? flags.aiProvider : null;
      const apiKey = provider ? sessionStorage.getItem(`${provider}_apikey`) : null;

      if (provider && apiKey) {
        const adapter = aiRouter.getAdapter();
        await adapter.initialize(provider, { apiKey });
        answer = await adapter.chat(conversation, document.content);
      } else {
        answer = answerStudyQuestion(question, document.content, messages);
      }
    } catch {
      answer = `Cloud AI could not respond, so here is a local answer instead.\n\n${answerStudyQuestion(question, document.content, messages)}`;
    }

    setMessages([...conversation, { role: 'assistant', content: answer }]);
    setIsLoading(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askQuestion(input);
  };

  const suggestions = [
    'What are the main topics in this material?',
    `What is meant by ${mainTopic}?`,
    'Give me a simple example from the syllabus.',
  ];

  return (
    <section className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-[#dce2d6] bg-white shadow-sm">
      <header className="border-b border-[#e3e7df] bg-[#f8f8f3] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#19372f]">Ask about your material</h2>
            <p className="mt-1 text-sm text-[#637168]">Ask a question, then follow up naturally.</p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setMessages([])}
              disabled={isLoading}
              className="text-sm font-semibold text-[#53645b] underline decoration-[#a8b2a7] underline-offset-4 hover:text-[#19372f] disabled:opacity-50"
            >
              Clear chat
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-[#69776d]">
          {cloudAIEnabled ? (
            'Cloud AI is on. Your question and study text are sent to your selected provider.'
          ) : (
            <>Private local answers are on. <Link href="/settings" className="font-semibold text-[#54752b] underline underline-offset-2">Enable Cloud AI in Settings</Link> for broader conversational answers.</>
          )}
        </p>
      </header>

      <div className="max-h-[55vh] min-h-64 space-y-4 overflow-y-auto px-4 py-5 sm:px-6" aria-live="polite">
        {messages.length === 0 ? (
          <div className="py-3">
            <p className="mb-4 text-sm text-[#657369]">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void askQuestion(suggestion)}
                  className="rounded-md border border-[#dce2d6] bg-[#fbfcf8] px-3 py-2 text-left text-sm text-[#365246] transition-colors hover:border-[#97aa8e] hover:bg-[#f0f4e9]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[90%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 ${
              message.role === 'user'
                ? 'bg-[#193f35] text-white'
                : 'bg-[#f2f4ed] text-[#263d33]'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <p className="text-sm text-[#637168]" role="status">Thinking through your question…</p>
        )}
        <div ref={messageEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-3 border-t border-[#e3e7df] p-4 sm:p-5">
        <label className="sr-only" htmlFor="study-question">Ask a question about this material</label>
        <textarea
          id="study-question"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              void askQuestion(input);
            }
          }}
          rows={2}
          maxLength={1000}
          placeholder="Ask about a topic, term, or syllabus question..."
          className="min-h-12 flex-1 resize-y rounded-md border border-[#cfd7cb] px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#668b36] focus:ring-2 focus:ring-[#668b36]/20"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-md bg-[#193f35] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#285a49] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
      <p className="px-5 pb-3 text-right text-[11px] text-[#7a867d]">{document.name}</p>
    </section>
  );
};