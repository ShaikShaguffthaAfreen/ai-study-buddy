import { describe, expect, it } from '@jest/globals';
import { answerStudyQuestion } from './questionAnswer';
import { ChatMessage } from '@/types';

describe('answerStudyQuestion', () => {
  const syllabus = [
    'Java is an object-oriented programming language used to build applications.',
    'Python is a high-level language with readable syntax.',
    'The syllabus covers variables, functions, and basic program structure.',
  ].join(' ');

  it('answers topic questions from the supplied study material', () => {
    const answer = answerStudyQuestion('What is meant by Java?', syllabus);
    expect(answer).toContain('In your study material');
    expect(answer).toContain('object-oriented programming language');
  });

  it('answers a vague follow-up using the previous assistant response', () => {
    const history: ChatMessage[] = [
      { role: 'user', content: 'What is Python?' },
      { role: 'assistant', content: 'Python is a high-level language with readable syntax.' },
    ];
    const answer = answerStudyQuestion('What is meant by that?', syllabus, history);
    expect(answer).toContain('In simpler terms');
    expect(answer).toContain('readable syntax');
  });

  it('returns the main syllabus topics and key points', () => {
    const answer = answerStudyQuestion('What are the main topics in my syllabus?', syllabus);
    expect(answer).toContain('main topics');
    expect(answer).toContain('variables');
    expect(answer).toContain('Java');
  });

  it('labels general definitions that are not in the uploaded material', () => {
    const answer = answerStudyQuestion('What is Python?', 'This syllabus covers biology and cells.');
    expect(answer).toContain('high-level programming language');
    expect(answer).toContain('general knowledge');
  });
});