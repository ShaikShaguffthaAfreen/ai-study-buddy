// IndexedDB storage layer with full persistence
import {
  Document,
  DocumentSection,
  Summary,
  Flashcard,
  Quiz,
  LearningProgress,
} from '@/types';

export class StorageDB {
  private dbName = 'StudyBuddy';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  /**
   * Initialize the database
   */
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createObjectStores(db);
      };
    });
  }

  /**
   * Create all object stores
   */
  private createObjectStores(db: IDBDatabase): void {
    const stores = [
      'documents',
      'sections',
      'summaries',
      'flashcards',
      'quizzes',
      'progress',
    ];

    stores.forEach(store => {
      if (!db.objectStoreNames.contains(store)) {
        const objectStore = db.createObjectStore(store, { keyPath: 'id' });
        objectStore.createIndex('createdAt', 'createdAt', { unique: false });
        if (store !== 'documents') {
          objectStore.createIndex('documentId', 'documentId', { unique: false });
        }
      }
    });
  }

  /**
   * Add or update a document
   */
  async saveDocument(doc: Document): Promise<void> {
    return this.executeTransaction(
      'documents',
      'readwrite',
      (store) => {
        store.put(doc);
      }
    );
  }

  /**
   * Get a document by ID
   */
  async getDocument(id: string): Promise<Document | null> {
    return this.executeQuery('documents', 'readonly', (store) =>
      store.get(id)
    ) as Promise<Document | null>;
  }

  /**
   * Get all documents
   */
  async getAllDocuments(): Promise<Document[]> {
    return this.executeQuery('documents', 'readonly', (store) =>
      store.getAll()
    ) as Promise<Document[]>;
  }

  /**
   * Delete a document and all related data
   */
  async deleteDocument(id: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        [
          'documents',
          'sections',
          'summaries',
          'flashcards',
          'quizzes',
          'progress',
        ],
        'readwrite'
      );

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();

      // Delete document
      transaction.objectStore('documents').delete(id);

      // Delete related data
      const deleteRelated = (storeName: string) => {
        const store = transaction.objectStore(storeName);
        const index = store.index('documentId');
        const range = IDBKeyRange.only(id);
        index.getAll(range).onsuccess = (event: any) => {
          event.target.result.forEach((item: any) => {
            store.delete(item.id);
          });
        };
      };

      deleteRelated('sections');
      deleteRelated('summaries');
      deleteRelated('flashcards');
      deleteRelated('quizzes');
      deleteRelated('progress');
    });
  }

  /**
   * Save document sections
   */
  async saveSections(sections: DocumentSection[]): Promise<void> {
    return this.executeTransaction(
      'sections',
      'readwrite',
      (store) => {
        sections.forEach(section => store.put(section));
      }
    );
  }

  /**
   * Get sections for a document
   */
  async getDocumentSections(documentId: string): Promise<DocumentSection[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve([]);
        return;
      }

      const transaction = this.db.transaction('sections', 'readonly');
      const store = transaction.objectStore('sections');
      const index = store.index('documentId');
      const range = IDBKeyRange.only(documentId);

      const request = index.getAll(range);
      request.onerror = () => reject(request.error);
      request.onsuccess = () =>
        resolve(request.result.sort((a, b) => a.order - b.order));
    });
  }

  /**
   * Save a summary
   */
  async saveSummary(summary: Summary): Promise<void> {
    return this.executeTransaction(
      'summaries',
      'readwrite',
      (store) => {
        store.put(summary);
      }
    );
  }

  /**
   * Get summaries for a document
   */
  async getDocumentSummaries(documentId: string): Promise<Summary[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve([]);
        return;
      }

      const transaction = this.db.transaction('summaries', 'readonly');
      const store = transaction.objectStore('summaries');
      const index = store.index('documentId');
      const range = IDBKeyRange.only(documentId);

      const request = index.getAll(range);
      request.onerror = () => reject(request.error);
      request.onsuccess = () =>
        resolve(request.result.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
    });
  }

  /**
   * Save flashcards
   */
  async saveFlashcards(flashcards: Flashcard[]): Promise<void> {
    return this.executeTransaction(
      'flashcards',
      'readwrite',
      (store) => {
        flashcards.forEach(card => store.put(card));
      }
    );
  }

  /**
   * Get flashcards for a document
   */
  async getDocumentFlashcards(documentId: string): Promise<Flashcard[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve([]);
        return;
      }

      const transaction = this.db.transaction('flashcards', 'readonly');
      const store = transaction.objectStore('flashcards');
      const index = store.index('documentId');
      const range = IDBKeyRange.only(documentId);

      const request = index.getAll(range);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Save quiz
   */
  async saveQuiz(quiz: Quiz): Promise<void> {
    return this.executeTransaction(
      'quizzes',
      'readwrite',
      (store) => {
        store.put(quiz);
      }
    );
  }

  /**
   * Get quizzes for a document
   */
  async getDocumentQuizzes(documentId: string): Promise<Quiz[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve([]);
        return;
      }

      const transaction = this.db.transaction('quizzes', 'readonly');
      const store = transaction.objectStore('quizzes');
      const index = store.index('documentId');
      const range = IDBKeyRange.only(documentId);

      const request = index.getAll(range);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Save or update learning progress
   */
  async saveProgress(progress: LearningProgress): Promise<void> {
    return this.executeTransaction(
      'progress',
      'readwrite',
      (store) => {
        store.put(progress);
      }
    );
  }

  /**
   * Get progress for a document
   */
  async getProgress(documentId: string): Promise<LearningProgress | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve(null);
        return;
      }

      const transaction = this.db.transaction('progress', 'readonly');
      const store = transaction.objectStore('progress');
      const index = store.index('documentId');
      const range = IDBKeyRange.only(documentId);

      const request = index.getAll(range);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result;
        resolve(results.length > 0 ? results[0] : null);
      };
    });
  }

  /**
   * Helper: Execute a transaction
   */
  private executeTransaction(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      const transaction = this.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();

      callback(store);
    });
  }

  /**
   * Helper: Execute a query
   */
  private executeQuery(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => IDBRequest<any>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve(null);
        return;
      }

      const transaction = this.db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);

      const request = callback(store);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Clear all data (for testing or reset)
   */
  async clearAllData(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        [
          'documents',
          'sections',
          'summaries',
          'flashcards',
          'quizzes',
          'progress',
        ],
        'readwrite'
      );

      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();

      ['documents', 'sections', 'summaries', 'flashcards', 'quizzes', 'progress'].forEach(
        (store) => {
          transaction.objectStore(store).clear();
        }
      );
    });
  }
}

// Singleton instance
export const db = new StorageDB();
