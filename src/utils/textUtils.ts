// Text utility functions
export class TextUtils {
  /**
   * Extract sentences from text
   */
  static extractSentences(text: string): string[] {
    const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
      .map(s => s.trim())
      .filter(s => s.length > 0);
    return sentences;
  }

  /**
   * Extract paragraphs from text
   */
  static extractParagraphs(text: string): string[] {
    return text
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  /**
   * Clean text: remove extra whitespace, fix encoding issues
   */
  static cleanText(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract words from text
   */
  static extractWords(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2);
  }

  /**
   * Calculate word frequency in text
   */
  static calculateWordFrequency(text: string): Map<string, number> {
    const words = this.extractWords(text);
    const frequency = new Map<string, number>();

    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'up', 'about', 'is', 'are', 'was', 'were',
      'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
      'could', 'should', 'may', 'might', 'can', 'must', 'this', 'that', 'these',
      'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which',
      'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both',
      'if', 'not', 'no', 'yes', 'as', 'so', 'such', 'only', 'same',
    ]);

    words.forEach(word => {
      if (!stopWords.has(word)) {
        frequency.set(word, (frequency.get(word) || 0) + 1);
      }
    });

    return frequency;
  }

  /**
   * Calculate similarity score between two texts (Jaccard similarity)
   */
  static calculateSimilarity(text1: string, text2: string): number {
    const words1 = new Set(this.extractWords(text1));
    const words2 = new Set(this.extractWords(text2));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }

  /**
   * Score a sentence based on keyword importance
   */
  static scoreSentence(
    sentence: string,
    keywords: Map<string, number>
  ): number {
    const words = this.extractWords(sentence);
    let score = 0;

    words.forEach(word => {
      score += keywords.get(word) || 0;
    });

    // Normalize by sentence length to avoid bias toward longer sentences
    return words.length > 0 ? score / words.length : 0;
  }

  /**
   * Extract key phrases (2-3 word combinations)
   */
  static extractKeyPhrases(text: string, count: number = 10): string[] {
    const sentences = this.extractSentences(text);
    const phrases: string[] = [];

    sentences.forEach(sentence => {
      const words = this.extractWords(sentence);
      for (let i = 0; i < words.length - 1; i++) {
        if (words[i].length > 3 && words[i + 1].length > 3) {
          phrases.push(`${words[i]} ${words[i + 1]}`);
        }
      }
    });

    // Count phrase frequencies
    const phraseFreq = new Map<string, number>();
    phrases.forEach(phrase => {
      phraseFreq.set(phrase, (phraseFreq.get(phrase) || 0) + 1);
    });

    // Sort by frequency and return top N
    return Array.from(phraseFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([phrase]) => phrase);
  }
}
