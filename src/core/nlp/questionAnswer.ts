import { ChatMessage } from '@/types';
import { TextUtils } from '@/utils/textUtils';

const generalDefinitions: Record<string, string> = {
  java: 'Java is a general-purpose, object-oriented programming language. Java programs commonly run on the Java Virtual Machine, which helps the same program work on different operating systems.',
  python: 'Python is a high-level programming language known for readable syntax. It is used in areas such as automation, web development, data analysis, and artificial intelligence.',
  javascript: 'JavaScript is a programming language commonly used to make websites interactive. It can also run on servers and in other environments.',
  ai: 'Artificial intelligence (AI) is the field of building computer systems that perform tasks associated with human abilities, such as recognizing patterns or understanding language.',
  'artificial intelligence': 'Artificial intelligence (AI) is the field of building computer systems that perform tasks associated with human abilities, such as recognizing patterns or understanding language.',
  'machine learning': 'Machine learning is a branch of artificial intelligence in which computers learn patterns from data to make predictions or decisions.',
  algorithm: 'An algorithm is a clear sequence of steps for solving a problem or completing a task.',
  variable: 'A variable is a named place in a program where a value can be stored and used.',
  function: 'A function is a reusable block of code that performs a particular task, often using inputs and returning a result.',
};

const stopWords = new Set([
  'about', 'after', 'again', 'also', 'and', 'are', 'could', 'does', 'explain',
  'from', 'give', 'help', 'how', 'into', 'mean', 'meant', 'more', 'please',
  'show', 'tell', 'that', 'the', 'their', 'them', 'there', 'these', 'this',
  'those', 'what', 'when', 'where', 'which', 'who', 'why', 'with', 'would',
]);

function requestedTerm(question: string): string {
  return question
    .replace(/^(?:please\s+)?(?:what\s+(?:is\s+)?(?:meant\s+by|the\s+meaning\s+of)\s+|what\s+is\s+|define\s+|explain\s+|meaning\s+of\s+|tell\s+me\s+about\s+)/i, '')
    .replace(/\b(?:in simple (?:words|terms)|simply|please)\??$/i, '')
    .replace(/[?.!]+$/, '')
    .trim();
}

function isVagueFollowUp(question: string): boolean {
  return /^(?:what does (?:that|this|it) mean|what is meant by (?:that|this|it)|what do you mean by (?:that|this|it)|explain (?:that|this|it)(?: again)?|can you explain (?:that|this|it)(?: again)?|tell me more|why (?:is|does) (?:that|this|it))\??$/i.test(question.trim());
}

function answerFollowUp(history: ChatMessage[]): string | null {
  const previousAnswer = [...history].reverse().find(message => message.role === 'assistant');
  if (previousAnswer) {
    const keyPoints = TextUtils.extractSentences(previousAnswer.content).slice(0, 2);
    return `In simpler terms, ${keyPoints.join(' ') || previousAnswer.content}`;
  }

  return null;
}

export function answerStudyQuestion(
  question: string,
  material: string,
  history: ChatMessage[] = []
): string {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return 'Ask me a question about your study material.';

  if (isVagueFollowUp(cleanQuestion)) {
    return answerFollowUp(history) ??
      'What would you like me to explain? Mention a topic or paste the sentence you mean.';
  }

  const sentences = TextUtils.extractSentences(material);
  const normalizedQuestion = cleanQuestion.toLowerCase();
  if (/\b(main ideas?|main topics?|key points?|syllabus|overview|summari[sz]e)\b/.test(normalizedQuestion)) {
    const points = sentences.slice(0, 8);
    const pointLines = points.map(point => `- ${point}`).join('\n');
    return `Here are the main topics and points I found in your material:${pointLines ? `\n\n${pointLines}` : ' No readable points were found.'}`;
  }

  const term = requestedTerm(cleanQuestion);
  if (term && !/^(?:that|this|it|these|those)$/i.test(term)) {
    const exactMatches = sentences.filter(sentence =>
      sentence.toLowerCase().includes(term.toLowerCase())
    );
    if (exactMatches.length > 0) {
      return `In your study material, ${term} is described this way: ${exactMatches.slice(0, 2).join(' ')}`;
    }

    const definition = Object.entries(generalDefinitions)
      .find(([concept]) => concept === term.toLowerCase())?.[1];
    if (definition) {
      return `${definition} This is general knowledge; I couldn't find this term in your uploaded material.`;
    }
  }

  const searchWords = new Set(
    TextUtils.extractWords(cleanQuestion).filter(word => !stopWords.has(word))
  );
  const relevantSentences = sentences
    .map((sentence, index) => {
      const sentenceWords = new Set(TextUtils.extractWords(sentence));
      const score = [...searchWords].filter(word => sentenceWords.has(word)).length;
      return { sentence, index, score };
    })
    .filter(result => result.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 3)
    .map(result => result.sentence);

  if (relevantSentences.length > 0) {
    return `Based on your study material: ${relevantSentences.join(' ')}`;
  }

  return `I couldn't find an answer to that in this document. Try asking about one of its topics, or enable Cloud AI in Settings for broader questions.`;
}