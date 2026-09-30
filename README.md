# AI-Powered Study Buddy

An offline-first AI learning companion that processes study materials locally with optional cloud AI integration. Built with Next.js, TypeScript, and modern NLP techniques.

## 🎯 Features

### Core Features (Always Available - Offline-First)
- ✅ **Upload Study Materials**: Support for PDF, DOCX, and TXT files
- ✅ **Smart Summarization**: Automatic extraction of key points using frequency-based NLP
- ✅ **Flashcard Generation**: Intelligent question-answer pairs from content
- ✅ **Quiz Creation**: Multiple choice questions with explanations
- ✅ **Topic Explanation**: Simplify complex concepts with term definitions and examples
- ✅ **Progress Tracking**: Monitor reading, flashcard reviews, quiz scores
- ✅ **Local Storage**: All data persists in IndexedDB (on-device)
- ✅ **Keyword Extraction**: Identify important topics automatically

### Optional Cloud AI Features (Feature-Flagged)
- 🌐 **Advanced Explanations**: Integration with OpenAI GPT or Google Gemini
- 🌐 **Enhanced Summarization**: Higher-quality summaries from cloud AI
- 🌐 **Conversational Learning**: Ask questions about study materials
- 🌐 **Better Quiz Generation**: Context-aware question creation

## 🏗️ Architecture

```
Frontend (Next.js + React)
    ↓
Local AI Engine (Rule-based NLP)
    ↓
Local Storage (IndexedDB)
    ↓
Optional: Cloud AI Adapter (OpenAI/Gemini)
```

### Local NLP Processing
- **Sentence Scoring**: Based on keyword frequency
- **Keyword Extraction**: TF-IDF-like analysis
- **Similarity Calculation**: Jaccard similarity for text comparison
- **Phrase Extraction**: Multi-word key concepts
- **Text Simplification**: Replace complex terms with explanations

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-study-buddy.git
   cd ai-study-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## 🚀 Usage

### 1. Upload Study Material
- Navigate to **Upload** page
- Select a PDF, DOCX, or TXT file
- File is processed locally and stored

### 2. Study Your Material
- Click "Study Now" on any document
- **Overview**: See keywords and document stats
- **Summary**: Read extracted key points
- **Flashcards**: Interactive flashcard review
- **Quiz**: Test your knowledge with MCQs
- **Explain**: Get simplified explanations

### 3. Track Progress
- View reading progress percentage
- Monitor flashcards reviewed
- Check quiz completion and scores
- See average performance metrics

### 4. Enable Cloud AI (Optional)
- Go to **Settings**
- Toggle "Enable Cloud AI"
- Choose provider: OpenAI or Gemini
- Enter API key (stored securely)
- Disabled by default for full offline functionality

## 💻 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State**: React Hooks

### Core Processing
- **File Parsing**: pdfjs-dist, mammoth, native File API
- **NLP**: Custom rule-based algorithms
- **Storage**: IndexedDB (browser storage)

### Optional Cloud AI
- **OpenAI Integration**: GPT-3.5-turbo / GPT-4
- **Google Gemini Integration**: Gemini Pro
- **Adapter Pattern**: Pluggable LLM providers

### Testing
- **Jest**: Unit and integration tests
- **React Testing Library**: Component tests

## 📁 Project Structure

```
ai-study-buddy/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── upload/          # Document upload
│   │   ├── study/[id]/      # Study interface
│   │   ├── settings/        # AI configuration
│   │   ├── progress/        # Progress tracking
│   │   └── layout.tsx       # Root layout
│   │
│   ├── components/          # React components
│   │   ├── FileUploader.tsx
│   │   ├── SummaryViewer.tsx
│   │   ├── FlashcardDeck.tsx
│   │   ├── QuizEngine.tsx
│   │   └── ProgressTracker.tsx
│   │
│   ├── core/
│   │   ├── parser/          # File parsing logic
│   │   │   └── fileParser.ts
│   │   ├── nlp/             # NLP algorithms
│   │   │   └── engine.ts
│   │   ├── storage/         # Data persistence
│   │   │   └── indexedDb.ts
│   │   └── featureFlags.ts  # Feature management
│   │
│   ├── ai/
│   │   └── llm.adapter.ts   # OpenAI & Gemini adapters
│   │
│   ├── utils/
│   │   └── textUtils.ts     # Text processing utilities
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   │
│   └── app/globals.css      # Global styles
│
├── docs/                    # Documentation
├── public/                  # Static assets
├── jest.config.js           # Jest configuration
├── jest.setup.js            # Jest setup
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind configuration
└── package.json             # Dependencies
```

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run with coverage
npm run test:ci
```

Test files are located alongside their source with `.test.ts` suffix:
- `textUtils.test.ts`: Text processing utilities
- `engine.test.ts`: NLP algorithms
- `fileParser.test.ts`: File parsing
- `featureFlags.test.ts`: Feature flag management

## 🔄 Core Algorithms

### Summarization Algorithm
1. Extract sentences from text
2. Calculate word frequencies (exclude stop words)
3. Score each sentence based on keyword importance
4. Return top N sentences by score

**Complexity**: O(n log n) where n = number of sentences

### Keyword Extraction
1. Extract all words from text
2. Remove stop words and short words
3. Count word frequencies
4. Return top N most frequent words

**Complexity**: O(n) where n = number of words

### Text Simplification
1. Identify complex terms in text
2. Look up definitions in knowledge base
3. Replace terms with simplified explanations
4. Return annotated text

### Flashcard Generation
1. Extract key sentences from text
2. Generate question-answer pairs
3. Assign difficulty based on term complexity
4. Return formatted flashcard deck

## 🔐 Security & Privacy

### Data Privacy
- ✅ All processing happens locally by default
- ✅ No data sent to servers without explicit opt-in
- ✅ Cloud AI API keys stored in sessionStorage (not localStorage)
- ✅ No tracking or analytics enabled
- ✅ No user accounts required

### Best Practices
- Enable HTTPS for production deployment
- Use environment variables for sensitive configs
- Rotate API keys regularly
- Never commit `.env` files

## 🌐 Deployment

### Deploy Website and Installable Mobile App to Vercel

The web app is also installable on supported phones as a Progressive Web App (PWA). It uses the responsive website and does not require a separate app-store build. HTTPS is required for installation and offline support.

1. Open [Vercel](https://vercel.com/) and sign in with the GitHub account that owns `ShaikShaguffthaAfreen/ai-study-buddy`.
2. Select **Add New... → Project**, import `ai-study-buddy`, and keep the detected Next.js settings.
3. Select **Deploy**. No environment variables are required for local-only features.
4. After deployment, open the provided `*.vercel.app` URL on desktop and phone.

Every push to the GitHub `main` branch triggers a new deployment.

### Install on a phone

- **Android:** Open the deployed HTTPS URL in Chrome, open the browser menu, then choose **Install app** or **Add to Home screen**.
- **iPhone/iPad:** Open the deployed HTTPS URL in Safari, tap **Share**, then **Add to Home Screen**.
- **Desktop:** Use the install icon in Chrome or Edge when offered in the address bar.

The service worker caches the app shell and previously visited pages/assets where available. First-time page loads and optional cloud AI still require an internet connection.

### Deploy to Vercel with the CLI
```bash
npm install
npm run build
npx vercel
```

The CLI will ask you to authenticate with Vercel and link the project. Follow the prompts, then run `npx vercel --prod` for the production URL.

### Deploy to Self-Hosted
```bash
npm run build
npm run start
```

## 📝 API Reference

### TextUtils
```typescript
TextUtils.extractSentences(text: string): string[]
TextUtils.extractParagraphs(text: string): string[]
TextUtils.cleanText(text: string): string
TextUtils.extractWords(text: string): string[]
TextUtils.calculateWordFrequency(text: string): Map<string, number>
TextUtils.extractKeyPhrases(text: string, count: number): string[]
```

### NLP Engine
```typescript
Summarizer.summarize(text: string, percentageToKeep: number): SummaryResult
KeywordExtractor.extractKeywords(text: string, count: number): string[]
Explainer.explain(text: string): ExplanationResult
QuizGenerator.generateMCQs(text: string, count: number): QuizGenerationResult
QuizGenerator.generateFlashcards(text: string, count: number): Flashcard[]
```

### Storage
```typescript
db.initialize(): Promise<void>
db.saveDocument(doc: Document): Promise<void>
db.getDocument(id: string): Promise<Document | null>
db.getAllDocuments(): Promise<Document[]>
db.deleteDocument(id: string): Promise<void>
db.saveSummary(summary: Summary): Promise<void>
db.saveFlashcards(flashcards: Flashcard[]): Promise<void>
db.saveProgress(progress: LearningProgress): Promise<void>
```

## 🚧 Roadmap

- [ ] Mobile app (React Native)
- [ ] Collaborative learning (study groups)
- [ ] AI-powered personalized learning paths
- [ ] Export to PDF/Anki
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Voice-based learning
- [ ] Integration with LMS platforms

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 💬 Support

- 📖 [Documentation](./docs)
- 🐛 [Report Issues](https://github.com/yourusername/ai-study-buddy/issues)
- 💡 [Feature Requests](https://github.com/yourusername/ai-study-buddy/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- PDF parsing with [PDF.js](https://mozilla.github.io/pdf.js)
- DOCX parsing with [Mammoth](https://github.com/mwilson/mammoth.js)

---

**Happy Learning!** 📚✨
