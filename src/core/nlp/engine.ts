// NLP Core module for local text analysis
import { TextUtils } from '@/utils/textUtils';
import {
  ExplanationResult,
  SummaryResult,
  QuizGenerationResult,
  QuizQuestion,
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
  static generateMCQs(text: string, count: number = 5): QuizGenerationResult {
    try {
      if (!text || text.trim().length === 0) {
        return { questions: [], totalQuestions: 0 };
      }

      const sentences = TextUtils.extractSentences(text);
      if (!sentences || sentences.length === 0) {
        return { questions: [], totalQuestions: 0 };
      }

      const keywords = KeywordExtractor.extractKeywords(text, 20);
      const questions: QuizQuestion[] = [];

      // Generate questions from sentences
      let questionCount = 0;
      for (let i = 0; i < sentences.length && questionCount < count; i++) {
        const sentence = sentences[i];
        
        // Skip very short sentences
        if (sentence.split(' ').length < 5) continue;

        // Create question variations
        if (sentence.includes('is') || sentence.includes('are')) {
          questions.push(this.createDefinitionQuestion(sentence, keywords));
          questionCount++;
        } else if (sentence.includes('because') || sentence.includes('due to')) {
          questions.push(this.createCausalQuestion(sentence, keywords));
          questionCount++;
        } else if (i < sentences.length - 1) {
          questions.push(this.createComprehensionQuestion(sentence, sentences[i + 1], keywords));
          questionCount++;
        }
      }

      return {
        questions: questions.slice(0, count),
        totalQuestions: questions.length,
      };
    } catch (error) {
      console.error('Error generating MCQs:', error);
      return { questions: [], totalQuestions: 0 };
    }
  }

  private static createDefinitionQuestion(
    sentence: string,
    keywords: string[]
  ): QuizQuestion {
    const parts = sentence.split(' is ');
    const term = parts[0].trim();
    const definition = parts.length > 1 ? parts[1].trim() : sentence;

    return {
      id: `q-${Math.random()}`,
      question: `What is ${term}?`,
      options: [
        definition,
        `A type of process`,
        `An important concept`,
        `None of the above`,
      ].sort(() => Math.random() - 0.5),
      correctAnswer: 0,
      explanation: `According to the text: "${definition}"`,
      userAnswer: undefined,
    };
  }

  private static createCausalQuestion(
    sentence: string,
    keywords: string[]
  ): QuizQuestion {
    const parts = sentence.split(/because|due to/i);
    const cause = parts.length > 1 ? parts[1].trim() : 'unknown cause';

    return {
      id: `q-${Math.random()}`,
      question: `Why does ${parts[0].trim()}?`,
      options: [
        cause,
        `Due to external factors`,
        `For historical reasons`,
        `No specific reason`,
      ].sort(() => Math.random() - 0.5),
      correctAnswer: 0,
      explanation: `The text explains: "${sentence}"`,
      userAnswer: undefined,
    };
  }

  private static createComprehensionQuestion(
    sentence1: string,
    sentence2: string,
    keywords: string[]
  ): QuizQuestion {
    return {
      id: `q-${Math.random()}`,
      question: `Based on the text, what follows from: "${sentence1}"?`,
      options: [
        sentence2,
        `The opposite happens`,
        `Nothing happens`,
        `It remains unchanged`,
      ].sort(() => Math.random() - 0.5),
      correctAnswer: 0,
      explanation: `The text shows this relationship between the sentences.`,
      userAnswer: undefined,
    };
  }

  /**
   * Generate flashcard pairs
   */
  static generateFlashcards(
    text: string,
    count: number = 10
  ): Array<{ question: string; answer: string }> {
    try {
      if (!text || text.trim().length === 0) {
        return [];
      }

      const sentences = TextUtils.extractSentences(text);
      if (!sentences || sentences.length === 0) {
        return [];
      }

      const keywords = KeywordExtractor.extractKeywords(text, Math.max(count, 10));
      if (!keywords || keywords.length === 0) {
        return [];
      }

      const flashcards: Array<{ question: string; answer: string }> = [];

      // Create keyword-based flashcards
      for (const keyword of keywords) {
        if (flashcards.length >= count) break;

        const matchingSentences = sentences.filter(s =>
          s.toLowerCase().includes(keyword.toLowerCase()) && s.length > 20
        );

        if (matchingSentences.length > 0) {
          flashcards.push({
            question: `What is ${keyword}?`,
            answer: matchingSentences[0].substring(0, 200), // Limit answer length
          });
        }
      }

      return flashcards.slice(0, count);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      return [];
    }
  }
}
