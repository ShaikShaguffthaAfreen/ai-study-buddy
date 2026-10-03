// NLP Core module for local text analysis
import { TextUtils } from '@/utils/textUtils';
import {
  ExplanationResult,
  SummaryResult,
  QuizGenerationResult,
} from '@/types';

export class Summarizer {
  /**
   * Generate a summary using frequency-based sentence extraction
   */
  static summarize(
    text: string,
    percentageToKeep: number = 0.3
  ): SummaryResult {
    const sentences = TextUtils.extractSentences(text);
    if (sentences.length === 0) {
      return { text: '', bulletPoints: [] };
    }

    // Calculate word frequencies
    const wordFreq = TextUtils.calculateWordFrequency(text);

    // Score each sentence
    const scoredSentences = sentences.map((sentence, index) => ({
      sentence,
      score: TextUtils.scoreSentence(sentence, wordFreq),
      index,
    }));

    // Sort by score and keep top N
    const summaryCount = Math.max(
      1,
      Math.ceil(sentences.length * percentageToKeep)
    );
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, summaryCount)
      .sort((a, b) => a.index - b.index)
      .map(s => s.sentence);

    const summaryText = topSentences.join(' ');
    const bulletPoints = topSentences;

    return { text: summaryText, bulletPoints };
  }

  /**
   * Generate bullet-point summary
   */
  static generateBulletPoints(text: string, maxPoints: number = 10): string[] {
    const { bulletPoints } = this.summarize(text, 0.2);
    return bulletPoints.slice(0, maxPoints);
  }
}

export class KeywordExtractor {
  /**
   * Extract important keywords from text
   */
  static extractKeywords(text: string, count: number = 10): string[] {
    const wordFreq = TextUtils.calculateWordFrequency(text);
    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([word]) => word);
  }

  /**
   * Extract key concepts (longer phrases)
   */
  static extractConcepts(text: string, count: number = 5): string[] {
    return TextUtils.extractKeyPhrases(text, count);
  }
}

export class Explainer {
  private static complexTerms: Map<string, string> = new Map([
    ['algorithm', 'A step-by-step procedure for solving a problem'],
    ['parameter', 'A variable or factor that can be adjusted'],
    ['recursion', 'A function that calls itself to solve smaller versions of a problem'],
    ['iteration', 'Repeating a process multiple times'],
    ['variable', 'A named storage location that holds a value'],
    ['function', 'A reusable block of code that performs a specific task'],
    ['data structure', 'A way of organizing data for efficient access and modification'],
    ['database', 'An organized collection of structured data'],
    ['API', 'A set of tools that allows different programs to communicate'],
    ['middleware', 'Software that acts as a bridge between applications'],
    ['framework', 'A pre-built set of tools and conventions for development'],
    ['library', 'A collection of reusable code and functions'],
    ['cache', 'Fast temporary storage for frequently accessed data'],
    ['encryption', 'Converting data into a secret code for security'],
    ['authentication', 'Verifying that someone is who they claim to be'],
    ['scalability', 'The ability of a system to handle growing amounts of work'],
    ['latency', 'The delay in a system response'],
    ['throughput', 'The amount of data processed in a given time'],
    ['concurrent', 'Multiple things happening at the same time'],
    ['asynchronous', 'Operations that do not wait for each other to complete'],
  ]);

  /**
   * Simplify technical text
   */
  static simplify(text: string): string {
    let simplified = text;

    // Replace complex terms with simpler explanations
    this.complexTerms.forEach((explanation, term) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      simplified = simplified.replace(
        regex,
        `${term} (${explanation})`
      );
    });

    return simplified;
  }

  /**
   * Generate detailed explanation of text
   */
  static explain(text: string): ExplanationResult {
    const sentences = TextUtils.extractSentences(text);
    const keywords = KeywordExtractor.extractKeywords(text, 5);
    
    // Generate simple examples based on common patterns
    const examples: string[] = [];
    
    // Check for common learning topics
    if (text.toLowerCase().includes('function')) {
      examples.push('For example, a function that adds two numbers takes inputs and produces an output.');
    }
    if (text.toLowerCase().includes('loop')) {
      examples.push('For example, a loop like "repeat 5 times" will execute the same code block 5 times.');
    }
    if (text.toLowerCase().includes('array')) {
      examples.push('For example, an array like [1, 2, 3] is a list that stores multiple values.');
    }
    if (text.toLowerCase().includes('condition')) {
      examples.push('For example, an if statement checks a condition and executes code only if it\'s true.');
    }
    if (examples.length === 0) {
      examples.push(sentences.length > 0 ? sentences[0] : 'See the main text for examples.');
    }

    return {
      simplified: this.simplify(text),
      keyTerms: keywords,
      examples: examples.slice(0, 3),
    };
  }

  /**
   * Add custom term definition
   */
  static addTermDefinition(term: string, definition: string): void {
    this.complexTerms.set(term.toLowerCase(), definition);
  }
}

export class QuizGenerator {
  /**
   * Generate multiple choice questions from text
   */
  static generateMCQs(
    text: string,
    count: number = 5,
    excludedQuestionIds: string[] = []
  ): QuizGenerationResult {
    try {
      if (!text || text.trim().length === 0) {
        return { questions: [], totalQuestions: 0 };
      }

      const sentences = TextUtils.extractSentences(text);
      if (!sentences || sentences.length === 0) {
        return { questions: [], totalQuestions: 0 };
      }

      const usableSentences = sentences.filter(sentence => sentence.split(' ').length >= 5);
      const topics = KeywordExtractor.extractKeywords(text, 3);
      const mainTopic = KeywordExtractor.extractConcepts(text, 1)[0] || topics[0] || 'the main topic';
      const topicSentences = usableSentences.filter(sentence =>
        topics.some(topic => sentence.toLowerCase().includes(topic.toLowerCase()))
      );
      const answerSentences = topicSentences.length > 0 ? topicSentences : usableSentences;
      const excluded = new Set(excludedQuestionIds);
      const seenPrompts = new Set<string>();
      const facts = answerSentences.map(sentence => {
        const definition = sentence.match(/^(.{2,80}?)\s+(is|are)\s+(.+)$/i);
        const cause = sentence.split(/\s+(?:because|due to)\s+/i);
        if (definition && definition[1].toLowerCase().includes(mainTopic.toLowerCase())) {
          const subject = definition[1].trim();
          const answer = definition[3].trim();
          return {
            answer,
            prompts: [
              `What is ${subject}?`,
              `How does the material define ${subject}?`,
              `Which description of ${subject} matches the material?`,
              `What does the text say about ${subject}?`,
            ],
          };
        }
        if (cause.length > 1 && cause[0].toLowerCase().includes(mainTopic.toLowerCase())) {
          const subject = cause[0].trim();
          const answer = cause.slice(1).join(' because ').trim();
          return {
            answer,
            prompts: [
              `Why ${subject}?`,
              `What reason does the material give for ${subject}?`,
              `According to the text, what causes ${subject}?`,
              `What explains ${subject}?`,
            ],
          };
        }
        return {
          answer: sentence,
          prompts: [
            `Which statement about ${mainTopic} is supported by the material?`,
            `What key point does the text make about ${mainTopic}?`,
            `Which detail about ${mainTopic} is included in the material?`,
            `What does the material say about ${mainTopic}?`,
          ],
        };
      });
      const candidates = facts.flatMap(fact =>
        fact.prompts.map(question => ({
          id: `q-${this.hashQuestion(question)}`,
          question,
          answer: fact.answer,
        })).filter(candidate => {
          if (seenPrompts.has(candidate.question) || excluded.has(candidate.id)) return false;
          seenPrompts.add(candidate.question);
          return true;
        }));

      this.shuffle(candidates);
      const questions = candidates.slice(0, count).map(candidate => {
        const distractors = this.shuffle(
          facts.map(fact => fact.answer).filter(answer => answer !== candidate.answer)
        ).slice(0, 3);
        const fallbackDistractors = [
          'The material does not support this statement.',
          'This idea is not mentioned in the material.',
          'The text gives a different explanation.',
        ];
        const options = this.shuffle([
          candidate.answer,
          ...distractors,
          ...fallbackDistractors.slice(0, Math.max(0, 3 - distractors.length)),
        ]);

        return {
          id: candidate.id,
          question: candidate.question,
          options,
          correctAnswer: options.indexOf(candidate.answer),
          explanation: `According to the material: "${candidate.answer}"`,
        };
      });

      return {
        questions,
        totalQuestions: candidates.length,
      };
    } catch (error) {
      console.error('Error generating MCQs:', error);
      return { questions: [], totalQuestions: 0 };
    }
  }

  private static shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  private static hashQuestion(value: string): string {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index++) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  /**
   * Generate flashcard pairs
   */
  static generateFlashcards(
    text: string,
    count: number = 10
  ): Array<{ question: string; answer: string }> {
    return this.generateMCQs(text, count).questions.map(question => ({
      question: question.question,
      answer: question.options[question.correctAnswer],
    }));
  }
}
