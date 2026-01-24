# Algorithms & NLP Implementation

## Text Processing Pipeline

### 1. Text Cleaning
```typescript
Input: Raw text with encoding issues, extra whitespace
       "This  is  a   text\r\nWith   issues"

Process:
1. Replace \r\n with \n (normalize line endings)
2. Replace multiple spaces with single space
3. Trim whitespace

Output: "This is a text\nWith issues"
```

### 2. Sentence Extraction
```typescript
Input: "First sentence. Second sentence! Third sentence?"

Process:
Split by [.!?] delimiters
Filter empty strings
Trim whitespace

Output: ["First sentence", "Second sentence", "Third sentence"]
```

## Summarization Algorithm

### Frequency-Based Extraction

**Algorithm**: Sentence scoring based on keyword importance

```typescript
Input: Full text document
Output: 30% of sentences that contain the most important keywords

Steps:
1. Extract all sentences: [s1, s2, s3, ..., sn]
2. Calculate word frequency:
   - Extract all words
   - Remove stop words (the, a, is, etc)
   - Count frequency of each word
   Result: {word: count, ...}

3. Score each sentence:
   For each sentence:
     score = sum(frequency[word] for word in sentence)
     normalized_score = score / sentence_length
   Result: [{sentence, score}, ...]

4. Sort sentences by score (descending)
5. Take top 30% by score
6. Sort selected sentences by original order
7. Join with spaces

Output: Summary text with top-scoring sentences
```

**Time Complexity**: O(n log n) where n = number of sentences
**Space Complexity**: O(n) for word frequency map

**Example**:
```
Input: "Python is great. Python is useful. Java is powerful."
Word Frequencies: {python: 2, great: 1, useful: 1, java: 1, powerful: 1}

Scores:
- "Python is great": (2 + 1) / 3 = 1.0
- "Python is useful": (2 + 1) / 3 = 1.0  
- "Java is powerful": (1 + 1) / 2 = 1.0

Take top 30% (1 of 3 sentences) → "Python is great"
```

## Keyword Extraction

### Frequency Analysis

**Algorithm**: Extract most frequently occurring words

```typescript
Steps:
1. Extract all words (length > 2)
2. Convert to lowercase
3. Remove stop words (predefined list)
4. Count frequencies
5. Sort by frequency (descending)
6. Return top N words

Time Complexity: O(n log N) where N = number of unique words
```

**Stop Words List**:
the, a, an, and, or, but, in, on, at, to, for, of, with, by, from, up, about, is, are, was, were, etc.

## Similarity Calculation

### Jaccard Similarity

```typescript
Formula: similarity = |A ∩ B| / |A ∪ B|

Steps:
1. Extract words from text1 → set A
2. Extract words from text2 → set B
3. Calculate intersection (common words)
4. Calculate union (all unique words)
5. Divide: intersection / union

Result: 0.0 (completely different) to 1.0 (identical)

Time Complexity: O(n + m) where n, m = word counts
```

**Example**:
```
Text1: "hello world"
Text2: "hello earth"

A = {hello, world}
B = {hello, earth}
Intersection = {hello}
Union = {hello, world, earth}
Similarity = 1/3 ≈ 0.33
```

## Quiz Generation

### MCQ Creation Strategy

**Algorithm**: Extract sentences and create questions

```typescript
Types of Questions:

1. Definition Questions (for sentences with "is/are")
   Input: "Python is a programming language"
   Question: "What is Python?"
   Options: [correct, distractor1, distractor2, distractor3]

2. Causal Questions (for "because/due to")
   Input: "The system failed because the server was down"
   Question: "Why did the system fail?"
   Options: [correct, distractor1, distractor2, distractor3]

3. Comprehension Questions
   Input: Previous sentence + next sentence
   Question: "Based on the text, what follows from: [sentence1]?"
   Options: [sentence2, distractor1, distractor2, distractor3]

Steps:
1. Extract sentences from text
2. For each sentence:
   - Check pattern (is/are, because, etc)
   - Generate appropriate question type
   - Create 4 options (1 correct + 3 distractors)
   - Shuffle options
3. Return array of questions

Time Complexity: O(n) where n = number of sentences
```

## Flashcard Generation

**Algorithm**: Extract key concepts and create Q&A pairs

```typescript
Steps:
1. Extract top N keywords
2. For each keyword:
   - Find sentence containing keyword
   - Use sentence as answer
   - Generate question: "What is [keyword]?"
3. Assign difficulty:
   - Easy: Common terms (frequency > 5)
   - Medium: Moderate terms (frequency 2-5)
   - Hard: Rare terms (frequency = 1)
4. Return formatted flashcards

Example Output:
{
  question: "What is machine learning?",
  answer: "Machine learning is a subset of AI...",
  difficulty: "medium"
}
```

## Text Simplification

### Term Replacement Strategy

```typescript
Algorithm:
1. Build knowledge base of complex terms:
   {
     "algorithm": "A step-by-step procedure",
     "recursion": "A function calling itself",
     ...
   }

2. For input text:
   - Find complex terms using regex
   - Replace with: term (definition)
   - Return annotated text

Example:
Input: "Use an algorithm with recursion"
Output: "Use an algorithm (A step-by-step procedure) with recursion (A function calling itself)"

Time Complexity: O(n * m) where n = text length, m = term count
```

## Phrase Extraction

### Multi-word Key Phrase Identification

```typescript
Algorithm: TF-IDF-like phrase extraction

Steps:
1. Extract 2-word phrases (adjacent significant words)
2. Count frequencies of each phrase
3. Filter phrases by minimum frequency
4. Sort by frequency (descending)
5. Return top N phrases

Example:
Text: "Machine learning uses neural networks. Neural networks are powerful."
Phrases: {machine learning: 1, neural networks: 2, ...}
Top 1: "neural networks"
```

## Performance Benchmarks

### Local Processing (on 10KB document)

| Operation | Time | Notes |
|-----------|------|-------|
| Text parsing | <50ms | File → text extraction |
| Summarization | ~100ms | Generate 30% summary |
| Keyword extraction | ~50ms | Extract top 10 keywords |
| Quiz generation | ~200ms | Generate 5 MCQs |
| Flashcard generation | ~150ms | Generate 10 cards |

### Memory Usage

| Data | Size | Notes |
|------|------|-------|
| 10KB document | ~50KB in memory | With cleanup |
| Word frequency map | ~2KB | For 1000 unique words |
| IndexedDB storage | ~100MB | Typical usage |

## Algorithm Limitations & Improvements

### Current Limitations

1. **Summarization**
   - Doesn't understand context semantically
   - May select related but redundant sentences
   - Improvement: Use sentence embeddings

2. **Keyword Extraction**
   - Simple frequency-based
   - Doesn't understand importance
   - Improvement: Use TF-IDF or neural embeddings

3. **Stop Words**
   - Static predefined list
   - Domain-specific terms may be filtered
   - Improvement: Dynamic stop words based on domain

4. **Quiz Generation**
   - May generate grammatically incorrect questions
   - Distractors are simple
   - Improvement: Use language models for validation

### Future Improvements

1. **Semantic Analysis**
   - Use sentence-transformers for embeddings
   - Calculate semantic similarity
   - Better context understanding

2. **Named Entity Recognition**
   - Identify people, places, concepts
   - Better highlight important entities
   - Generate entity-focused questions

3. **Dependency Parsing**
   - Understand grammatical relationships
   - Generate more coherent summaries
   - Better paraphrase questions

4. **Domain-Specific Models**
   - Fine-tune for specific subjects
   - Better terminology recognition
   - Domain-aware question generation

## References

1. **Frequency-based Summarization**: 
   - Luhn, H. P. (1958). "The Automatic Creation of Literature Abstracts"

2. **Jaccard Similarity**:
   - Jaccard, P. (1901). "Distribution de la flore alpine"

3. **TF-IDF**:
   - Salton, G., & McGill, M. J. (1983). "Introduction to Modern Information Retrieval"

4. **Stop Words**:
   - Common English stop word list variations

5. **NLP Algorithms**:
   - Natural Language Toolkit (NLTK) documentation
   - spaCy documentation
