import { ChatMessage } from '@/types';

// LLM Provider Interface
export interface LLMProvider {
  chat(messages: ChatMessage[], context: string): Promise<string>;
  explain(text: string): Promise<string>;
  summarize(text: string): Promise<string>;
  generateQuestions(text: string, count: number): Promise<string[]>;
  generateFlashcards(text: string, count: number): Promise<Array<{ question: string; answer: string }>>;
}

export interface LLMProviderConfig {
  apiKey: string;
  model?: string;
}

export class LLMAdapter {
  private provider: LLMProvider | null = null;
  private providerType: 'openai' | 'gemini' | null = null;

  async initialize(providerType: 'openai' | 'gemini', config: LLMProviderConfig): Promise<void> {
    this.providerType = providerType;

    if (providerType === 'openai') {
      this.provider = new OpenAIProvider(config);
    } else if (providerType === 'gemini') {
      this.provider = new GeminiProvider(config);
    }
  }

  async explain(text: string): Promise<string> {
    if (!this.provider) {
      throw new Error('LLM provider not initialized');
    }
    return this.provider.explain(text);
  }

  async chat(messages: ChatMessage[], context: string): Promise<string> {
    if (!this.provider) {
      throw new Error('LLM provider not initialized');
    }
    return this.provider.chat(messages, context);
  }

  async summarize(text: string): Promise<string> {
    if (!this.provider) {
      throw new Error('LLM provider not initialized');
    }
    return this.provider.summarize(text);
  }

  async generateQuestions(text: string, count: number = 5): Promise<string[]> {
    if (!this.provider) {
      throw new Error('LLM provider not initialized');
    }
    return this.provider.generateQuestions(text, count);
  }

  async generateFlashcards(
    text: string,
    count: number = 10
  ): Promise<Array<{ question: string; answer: string }>> {
    if (!this.provider) {
      throw new Error('LLM provider not initialized');
    }
    return this.provider.generateFlashcards(text, count);
  }

  getProviderType(): string | null {
    return this.providerType;
  }
}

// OpenAI Provider Implementation
class OpenAIProvider implements LLMProvider {
  private apiKey: string;
  private model: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(config: LLMProviderConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gpt-3.5-turbo';
  }

  private async call(prompt: string, systemPrompt: string = ''): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            systemPrompt ? { role: 'system', content: systemPrompt } : null,
            { role: 'user', content: prompt },
          ].filter(Boolean),
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      throw new Error(`OpenAI API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async chat(messages: ChatMessage[], context: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are a patient study tutor. Answer in clear, student-friendly language. Use the uploaded study material as the primary source, preserve context from the conversation for follow-up questions such as "what does that mean?", and distinguish general knowledge from anything not covered by the material. If the question is ambiguous, ask one short clarifying question.\n\nUploaded study material:\n${context.slice(0, 18000)}`,
            },
            ...messages.slice(-12),
          ],
          temperature: 0.4,
          max_tokens: 1200,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;
      if (typeof answer !== 'string' || !answer.trim()) {
        throw new Error('OpenAI returned an empty answer');
      }
      return answer.trim();
    } catch (error) {
      throw new Error(`OpenAI chat failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async explain(text: string): Promise<string> {
    const systemPrompt = 'You are an expert educator. Provide a clear, beginner-friendly explanation.';
    const prompt = `Explain this topic in simple terms:\n\n${text}`;
    return this.call(prompt, systemPrompt);
  }

  async summarize(text: string): Promise<string> {
    const systemPrompt = 'You are an expert summarizer. Create concise, well-structured summaries.';
    const prompt = `Create a concise summary of this text:\n\n${text}`;
    return this.call(prompt, systemPrompt);
  }

  async generateQuestions(text: string, count: number = 5): Promise<string[]> {
    const systemPrompt = 'Generate exactly the requested number of questions based on the text.';
    const prompt = `Generate ${count} multiple choice questions from this text:\n\n${text}`;
    const response = await this.call(prompt, systemPrompt);
    return response.split('\n').filter(q => q.trim().length > 0);
  }

  async generateFlashcards(
    text: string,
    count: number = 10
  ): Promise<Array<{ question: string; answer: string }>> {
    const systemPrompt = 'Generate Q&A pairs in JSON format. Return array of {question, answer} objects.';
    const prompt = `Generate ${count} flashcard Q&A pairs from this text. Return as JSON array:\n\n${text}`;
    const response = await this.call(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch {
      return [];
    }
  }
}

// Gemini Provider Implementation
class GeminiProvider implements LLMProvider {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
  private model: string;

  constructor(config: LLMProviderConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'gemini-1.5-flash';
  }

  private async call(prompt: string, systemPrompt: string = ''): Promise<string> {
    try {
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
      
      const response = await fetch(
        `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      throw new Error(`Gemini API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async chat(messages: ChatMessage[], context: string): Promise<string> {
    try {
      const systemPrompt = `You are a patient study tutor. Answer in clear, student-friendly language. Use the uploaded study material as the primary source, preserve context from the conversation for follow-up questions such as "what does that mean?", and distinguish general knowledge from anything not covered by the material. If the question is ambiguous, ask one short clarifying question.\n\nUploaded study material:\n${context.slice(0, 18000)}`;
      const response = await fetch(
        `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: messages.slice(-12).map(message => ({
              role: message.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: message.content }],
            })),
            generationConfig: { temperature: 0.4, maxOutputTokens: 1200 },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (typeof answer !== 'string' || !answer.trim()) {
        throw new Error('Gemini returned an empty answer');
      }
      return answer.trim();
    } catch (error) {
      throw new Error(`Gemini chat failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async explain(text: string): Promise<string> {
    const systemPrompt = 'You are an expert educator. Provide a clear, beginner-friendly explanation.';
    const prompt = `Explain this topic in simple terms:\n\n${text}`;
    return this.call(prompt, systemPrompt);
  }

  async summarize(text: string): Promise<string> {
    const systemPrompt = 'You are an expert summarizer. Create concise, well-structured summaries.';
    const prompt = `Create a concise summary of this text:\n\n${text}`;
    return this.call(prompt, systemPrompt);
  }

  async generateQuestions(text: string, count: number = 5): Promise<string[]> {
    const systemPrompt = 'Generate exactly the requested number of questions based on the text.';
    const prompt = `Generate ${count} multiple choice questions from this text:\n\n${text}`;
    const response = await this.call(prompt, systemPrompt);
    return response.split('\n').filter(q => q.trim().length > 0);
  }

  async generateFlashcards(
    text: string,
    count: number = 10
  ): Promise<Array<{ question: string; answer: string }>> {
    const systemPrompt = 'Generate Q&A pairs in JSON format. Return array of {question, answer} objects.';
    const prompt = `Generate ${count} flashcard Q&A pairs from this text. Return as JSON array:\n\n${text}`;
    const response = await this.call(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch {
      return [];
    }
  }
}

// Router to use appropriate provider
export const aiRouter = {
  getAdapter: (): LLMAdapter => {
    return new LLMAdapter();
  },
};
