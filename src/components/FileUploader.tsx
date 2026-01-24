'use client';

import React, { useState, useRef } from 'react';
import { FileParser } from '@/core/parser/fileParser';
import { db } from '@/core/storage/indexedDb';
import { Document } from '@/types';

interface FileUploaderProps {
  onUploadSuccess: (document: Document) => void;
  onUploadError: (error: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!validTypes.includes(file.type) && !file.name.endsWith('.docx') && !file.name.endsWith('.txt') && !file.name.endsWith('.pdf')) {
        throw new Error('Invalid file type. Please upload PDF, DOCX, or TXT files.');
      }

      // Parse file
      const parseResult = await FileParser.parse(file);
      setUploadProgress(50);

      if (!parseResult.success) {
        throw new Error(parseResult.error || 'Failed to parse file');
      }

      // Create document object
      const doc: Document = {
        id: `doc-${Date.now()}-${Math.random()}`,
        name: file.name,
        content: parseResult.content,
        fileType: (file.name.split('.').pop()?.toLowerCase() as any) || 'txt',
        uploadedAt: new Date(),
        size: file.size,
        sections: parseResult.sections || [],
      };

      // Save to database
      await db.saveDocument(doc);
      if (doc.sections.length > 0) {
        await db.saveSections(doc.sections.map(s => ({ ...s, documentId: doc.id })));
      }

      setUploadProgress(100);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onUploadSuccess(doc);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onUploadError(errorMessage);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer block"
        >
          <div className="text-4xl mb-2">📄</div>
          <p className="text-lg font-semibold text-gray-700 mb-1">
            {isLoading ? 'Processing...' : 'Upload Study Material'}
          </p>
          <p className="text-sm text-gray-500">
            PDF, DOCX, or TXT files only
          </p>
        </label>

        {isLoading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{uploadProgress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};
