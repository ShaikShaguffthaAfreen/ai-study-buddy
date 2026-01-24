// File parser utilities
import { ParseResult, DocumentSection } from '@/types';
import { TextUtils } from '@/utils/textUtils';

export class TextParser {
  static async parse(file: File): Promise<ParseResult> {
    try {
      const text = await file.text();
      const cleaned = TextUtils.cleanText(text);
      const sections = this.extractSections(cleaned);

      return {
        success: true,
        content: cleaned,
        sections,
      };
    } catch (error) {
      return {
        success: false,
        content: '',
        error: `Failed to parse text file: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private static extractSections(text: string): DocumentSection[] {
    const sections: DocumentSection[] = [];
    const paragraphs = TextUtils.extractParagraphs(text);

    paragraphs.forEach((para, index) => {
      sections.push({
        id: `section-${index}`,
        documentId: '', // Will be set by storage layer
        title: `Section ${index + 1}`,
        content: para,
        order: index,
      });
    });

    return sections;
  }
}

export class PDFParser {
  static async parse(file: File): Promise<ParseResult> {
    try {
      // Dynamic import for PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      const pdf = pdfjsLib.getDocument;

      // Set worker source for PDF.js - use local worker file from public folder
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdf(new Uint8Array(arrayBuffer));
      const document = await loadingTask.promise;

      let fullText = '';
      const maxPages = Math.min(document.numPages, 500); // Limit to 500 pages

      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await document.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + '\n\n';
      }

      const cleaned = TextUtils.cleanText(fullText);
      const sections = this.extractSections(cleaned);

      return {
        success: true,
        content: cleaned,
        sections,
      };
    } catch (error) {
      return {
        success: false,
        content: '',
        error: `Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private static extractSections(text: string): DocumentSection[] {
    const sections: DocumentSection[] = [];
    const paragraphs = TextUtils.extractParagraphs(text);

    paragraphs.forEach((para, index) => {
      sections.push({
        id: `section-${index}`,
        documentId: '', // Will be set by storage layer
        title: `Section ${index + 1}`,
        content: para,
        order: index,
      });
    });

    return sections;
  }
}

export class DOCXParser {
  static async parse(file: File): Promise<ParseResult> {
    try {
      // Dynamic import for mammoth
      const mammoth = await import('mammoth');

      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });

      const cleaned = TextUtils.cleanText(result.value);
      const sections = this.extractSections(cleaned);

      return {
        success: true,
        content: cleaned,
        sections,
      };
    } catch (error) {
      return {
        success: false,
        content: '',
        error: `Failed to parse DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  private static extractSections(text: string): DocumentSection[] {
    const sections: DocumentSection[] = [];
    const paragraphs = TextUtils.extractParagraphs(text);

    paragraphs.forEach((para, index) => {
      sections.push({
        id: `section-${index}`,
        documentId: '', // Will be set by storage layer
        title: `Section ${index + 1}`,
        content: para,
        order: index,
      });
    });

    return sections;
  }
}

export class FileParser {
  static async parse(file: File): Promise<ParseResult> {
    const ext = file.name.split('.').pop()?.toLowerCase();

    switch (ext) {
      case 'pdf':
        return PDFParser.parse(file);
      case 'docx':
      case 'doc':
        return DOCXParser.parse(file);
      case 'txt':
        return TextParser.parse(file);
      default:
        return {
          success: false,
          content: '',
          error: `Unsupported file type: ${ext}`,
        };
    }
  }
}
