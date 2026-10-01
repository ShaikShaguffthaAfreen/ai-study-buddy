import { describe, expect, it } from '@jest/globals';
import { FileParser } from '@/core/parser/fileParser';

describe('File Parser', () => {
  describe('TextParser', () => {
    it('should parse text files', async () => {
      const text = 'This is a test document.\n\nSecond paragraph here.';
      const file = new File([text], 'test.txt', { type: 'text/plain' });
      const result = await FileParser.parse(file);

      expect(result.success).toBe(true);
      expect(result.content).toContain('test document');
      expect(result.sections).toBeDefined();
      expect(result.sections!.length).toBeGreaterThan(0);
    });

    it('should handle file parsing errors gracefully', async () => {
      const file = new File([], 'test.xyz', { type: 'application/octet-stream' });
      const result = await FileParser.parse(file);

      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('FileParser routing', () => {
    it('should route to correct parser based on file type', async () => {
      const text = 'Test content';
      const txtFile = new File([text], 'test.txt', { type: 'text/plain' });
      const result = await FileParser.parse(txtFile);

      expect(result.success).toBe(true);
    });

    it('should reject unsupported file types', async () => {
      const file = new File([], 'test.xyz', { type: 'application/xyz' });
      const result = await FileParser.parse(file);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unsupported');
    });
  });
});
