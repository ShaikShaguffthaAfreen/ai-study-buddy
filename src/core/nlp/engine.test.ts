import { Summarizer, KeywordExtractor, Explainer, QuizGenerator } from '@/core/nlp/engine';

describe('NLP Engine', () => {
  const sampleText = `
    Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience.
    Deep learning is a technique within machine learning that uses neural networks with multiple layers.
    Neural networks are inspired by the human brain and consist of interconnected nodes.
    The training process involves adjusting weights to minimize errors in predictions.
    Data is essential for training accurate machine learning models.
  `;

  describe('Summarizer', () => {
    it('should generate a summary', () => {
      const result = Summarizer.summarize(sampleText, 0.3);
      expect(result.text.length).toBeGreaterThan(0);
      expect(result.bulletPoints.length).toBeGreaterThan(0);
    });

    it('should generate bullet points', () => {
      const bullets = Summarizer.generateBulletPoints(sampleText, 5);
      expect(bullets.length).toBeGreaterThan(0);
      expect(Array.isArray(bullets)).toBe(true);
    });

    it('should handle empty text', () => {
      const result = Summarizer.summarize('', 0.3);
      expect(result.text).toBe('');
      expect(result.bulletPoints).toEqual([]);
    });
  });

  describe('KeywordExtractor', () => {
    it('should extract keywords', () => {
      const keywords = KeywordExtractor.extractKeywords(sampleText, 5);
      expect(keywords.length).toBeGreaterThan(0);
      expect(Array.isArray(keywords)).toBe(true);
    });

    it('should extract concepts', () => {
      const concepts = KeywordExtractor.extractConcepts(sampleText, 3);
      expect(Array.isArray(concepts)).toBe(true);
    });
  });

  describe('Explainer', () => {
    it('should simplify text', () => {
      const simplified = Explainer.simplify('The algorithm uses recursion');
      expect(simplified.length).toBeGreaterThan(0);
      expect(simplified).toContain('algorithm');
    });

    it('should provide explanation', () => {
      const explanation = Explainer.explain(sampleText);
      expect(explanation.simplified.length).toBeGreaterThan(0);
      expect(explanation.keyTerms.length).toBeGreaterThan(0);
      expect(explanation.examples.length).toBeGreaterThan(0);
    });

    it('should allow custom term definitions', () => {
      const term = 'quantum';
      const definition = 'Related to quantum mechanics';
      Explainer.addTermDefinition(term, definition);
      const explanation = Explainer.explain('This is a quantum concept');
      expect(explanation.simplified).toContain(definition);
    });
  });

  describe('QuizGenerator', () => {
    it('should generate MCQs', () => {
      const result = QuizGenerator.generateMCQs(sampleText, 3);
      expect(result.questions.length).toBeGreaterThan(0);
      expect(result.totalQuestions).toBeGreaterThan(0);
    });

    it('should create valid quiz questions', () => {
      const result = QuizGenerator.generateMCQs(sampleText, 1);
      const question = result.questions[0];
      expect(question.question).toBeTruthy();
      expect(question.options.length).toBe(4);
      expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(question.correctAnswer).toBeLessThan(4);
    });

    it('should focus questions on the main topic and track used questions', () => {
      const firstQuiz = QuizGenerator.generateMCQs(sampleText, 5);
      const nextQuiz = QuizGenerator.generateMCQs(
        sampleText,
        5,
        firstQuiz.questions.map(question => question.id)
      );

      expect(firstQuiz.questions.some(question =>
        question.question.toLowerCase().includes('learning')
      )).toBe(true);
      expect(nextQuiz.questions.length).toBeGreaterThan(0);
      expect(new Set(firstQuiz.questions.map(question => question.question)).size)
        .toBe(firstQuiz.questions.length);
      expect(nextQuiz.questions.some(question =>
        firstQuiz.questions.some(previous => previous.question === question.question)
      )).toBe(false);
      firstQuiz.questions.forEach(question => {
        expect(question.options[question.correctAnswer]).toBeTruthy();
        expect(question.explanation).toContain(question.options[question.correctAnswer]);
      });
    });

    it('should generate flashcards', () => {
      const flashcards = QuizGenerator.generateFlashcards(sampleText, 5);
      expect(flashcards.length).toBeGreaterThan(0);
      flashcards.forEach(card => {
        expect(card.question).toBeTruthy();
        expect(card.answer).toBeTruthy();
      });
    });
  });
});
