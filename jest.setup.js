require('@testing-library/jest-dom');

if (typeof File !== 'undefined' && typeof File.prototype.text !== 'function') {
  File.prototype.text = function () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
      reader.readAsText(this);
    });
  };
}

// Mock IndexedDB for testing
const mockIndexedDB = {
  open: jest.fn(),
};
Object.assign(global, { indexedDB: mockIndexedDB });

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.assign(global, { localStorage: localStorageMock });
