import { describe, expect, it } from '@jest/globals';
import { TextUtils } from '@/utils/textUtils';

describe('TextUtils', () => {
  const sampleText =
    'The quick brown fox jumps over the lazy dog. This is a test. The test is important.';

  describe('extractSentences', () => {
    it('should extract sentences from text', () => {
      const sentences = TextUtils.extractSentences(sampleText);
      expect(sentences.length).toBeGreaterThan(0);
      expect(sentences[0]).toContain('quick brown fox');
      expect(sentences[0].endsWith('.')).toBe(true);
    });

    it('should handle empty text', () => {
      const sentences = TextUtils.extractSentences('');
      expect(sentences).toEqual([]);
    });
  });

  describe('extractParagraphs', () => {
    it('should extract paragraphs separated by newlines', () => {
      const text = 'Paragraph 1\n\nParagraph 2\n\nParagraph 3';
      const paragraphs = TextUtils.extractParagraphs(text);
      expect(paragraphs.length).toBe(3);
    });
  });

  describe('cleanText', () => {
    it('should clean text by removing extra whitespace', () => {
      const dirty = 'This   has   extra    spaces';
      const clean = TextUtils.cleanText(dirty);
      expect(clean).toBe('This has extra spaces');
    });

    it('should handle carriage returns', () => {
      const dirty = 'Line1\r\nLine2';
      const clean = TextUtils.cleanText(dirty);
      expect(clean).toContain('Line1');
      expect(clean).toContain('Line2');
    });
  });

  describe('extractWords', () => {
    it('should extract words from text', () => {
      const words = TextUtils.extractWords(sampleText);
      expect(words.length).toBeGreaterThan(0);
      expect(words).toContain('quick');
    });

    it('should filter words shorter than three characters', () => {
      const words = TextUtils.extractWords('a an the quick');
      expect(words).not.toContain('a');
      expect(words).not.toContain('an');
      expect(words).toContain('the');
    });
  });

  describe('calculateWordFrequency', () => {
    it('should calculate word frequencies', () => {
      const freq = TextUtils.calculateWordFrequency(sampleText);
      expect(freq.size).toBeGreaterThan(0);
      expect(freq.get('test')).toBe(2);
    });

    it('should exclude stop words', () => {
      const freq = TextUtils.calculateWordFrequency('the the the quick');
      expect(freq.get('the')).toBeUndefined();
    });
  });

  describe('calculateSimilarity', () => {
    it('should calculate similarity between texts', () => {
      const text1 = 'hello world';
      const text2 = 'hello world';
      const similarity = TextUtils.calculateSimilarity(text1, text2);
      expect(similarity).toBe(1);
    });

    it('should return lower similarity for different texts', () => {
      const text1 = 'hello world';
      const text2 = 'goodbye earth';
      const similarity = TextUtils.calculateSimilarity(text1, text2);
      expect(similarity).toBeLessThan(0.5);
    });
  });

  describe('extractKeyPhrases', () => {
    it('should extract key phrases', () => {
      const phrases = TextUtils.extractKeyPhrases(sampleText, 5);
      expect(Array.isArray(phrases)).toBe(true);
    });
  });
});
