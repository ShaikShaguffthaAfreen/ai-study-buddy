# Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────┐
│         User Interface (React)              │
│  - FileUploader, SummaryViewer, Quiz UI    │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│    Application Logic Layer                   │
│  - Page components & navigation              │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│    Local AI Engine (Core Processing)         │
│  - Text parsing (PDF, DOCX, TXT)           │
│  - NLP algorithms (summarization, etc)      │
│  - Quiz & flashcard generation             │
│  - Text simplification & explanation       │
└────────────────┬────────────────────────────┘
                 │
┌─────────────────▼────────────────────────────┐
│    Data Storage Layer                        │
│  - IndexedDB (persistent on-device storage) │
│  - Progress tracking                        │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   Local Only      Optional Cloud
                        │
        ┌───────────────┴────────────────┐
        │                                │
   ┌────▼──────┐              ┌────────▼────┐
   │  OpenAI   │              │   Gemini    │
   │  (GPT)    │              │   API       │
   └───────────┘              └─────────────┘
```

## Data Flow

### Document Upload Flow
1. User selects file
2. Frontend validates file type
3. FileParser routes to appropriate parser (PDF/DOCX/TXT)
4. Parser extracts raw text and sections
5. Text is cleaned and stored in IndexedDB
6. UI displays success and lists document

### Study Flow
1. User clicks "Study Now" on a document
2. Document loaded from IndexedDB
3. NLP engines generate:
   - Summary (using TextUtils)
   - Flashcards (using QuizGenerator)
   - Quiz (using QuizGenerator)
   - Explanations (using Explainer)
4. UI displays interactive study tools
5. User actions (correct/incorrect) tracked locally

### Optional Cloud AI Flow
1. User enables in Settings
2. API key stored securely
3. Feature flag updated
4. When advanced features requested:
   - LLMAdapter initialized with provider
   - Request sent to cloud AI
   - Response cached locally
   - UI displays enhanced content

## Key Design Decisions

### 1. Offline-First Architecture
- **Rationale**: Works without internet, faster performance
- **Implementation**: All core features use local processing
- **Trade-offs**: Simpler NLP algorithms vs advanced AI

### 2. Pluggable LLM Adapters
- **Rationale**: Easy to add new AI providers
- **Implementation**: LLMProvider interface with OpenAI & Gemini implementations
- **Trade-offs**: More abstraction layers

### 3. IndexedDB for Storage
- **Rationale**: Large capacity, persistent, no server needed
- **Implementation**: Structured store with indexes for fast queries
- **Trade-offs**: Browser-dependent, no sync across devices

### 4. Feature Flags for AI Integration
- **Rationale**: Keep core features separate from optional AI
- **Implementation**: FeatureFlagManager with localStorage persistence
- **Trade-offs**: Additional configuration required

### 5. Component-Based UI
- **Rationale**: Reusable, testable, maintainable
- **Implementation**: Separate components for each feature
- **Trade-offs**: More files to manage

## Module Dependencies

```
Components
  ├── uses → Pages
  ├── uses → Core/Storage
  ├── uses → Core/NLP
  └── uses → Core/Parser

Pages
  ├── uses → Components
  ├── uses → Core/Storage
  ├── uses → Core/NLP
  └── uses → Core/Parser

Core/Storage (IndexedDB)
  ├── uses → Types

Core/NLP
  ├── uses → TextUtils
  └── uses → Types

Core/Parser
  ├── uses → TextUtils
  └── uses → Types

AI/LLM
  ├── optional dependency
  └── uses → Types
```

## Performance Considerations

### Text Processing
- **Optimize**: Cache word frequency calculations
- **Optimize**: Use streaming for large files
- **Avoid**: Processing entire document for each query

### Storage
- **Optimize**: Index frequently queried fields (documentId, createdAt)
- **Optimize**: Batch inserts for multiple items
- **Avoid**: Loading all documents at once (use pagination)

### UI Rendering
- **Optimize**: Lazy load components
- **Optimize**: Memoize expensive calculations
- **Avoid**: Re-rendering entire document on minor changes

## Security Model

```
Trust Boundary
───────────────────────────────────────
PUBLIC         │   PRIVATE
(Browser)      │   (Local Device)
               │
Local Storage  │   IndexedDB
SessionStorage │   (Persistent)
               │
               │   API Keys
               │   (SessionStorage only)
───────────────────────────────────────
```

## Testing Strategy

### Unit Tests
- TextUtils: Text processing functions
- NLP Engine: Algorithms (summarization, keyword extraction)
- FileParser: File parsing logic
- FeatureFlags: Configuration management

### Integration Tests
- Storage layer: Save/load/delete operations
- Parser → Storage: End-to-end file processing

### Component Tests
- FileUploader: Upload flow
- FlashcardDeck: Interaction handling
- QuizEngine: Question progression

### E2E Tests (Manual)
1. Upload a document
2. Generate all study materials
3. Complete a quiz
4. Enable cloud AI
5. Track progress

## Scalability

### Current Limits
- Document size: ~100MB (browser memory limit)
- Total storage: ~50GB (IndexedDB limit)
- Number of documents: Unlimited (until storage limit)

### Optimization for Scale
- Implement document chunking for large files
- Add compression for storage efficiency
- Use Web Workers for background processing
- Implement virtual scrolling for large lists

## Future Enhancements

### Short-term
- [ ] Export to Anki/Quizlet formats
- [ ] Keyboard shortcuts for UI
- [ ] Dark mode
- [ ] Undo/redo for quiz answers

### Medium-term
- [ ] Spaced repetition algorithm
- [ ] Study recommendations
- [ ] Collaborative learning
- [ ] Mobile-responsive improvements

### Long-term
- [ ] Local LLM inference (ONNX.js)
- [ ] Sync across devices (with auth)
- [ ] Community shared materials
- [ ] Learning path recommendations
