require('@testing-library/jest-dom');

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
