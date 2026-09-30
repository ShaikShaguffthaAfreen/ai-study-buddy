// Feature flag management for optional LLM integration
export interface FeatureFlags {
  enableAI: boolean;
  aiProvider: 'openai' | 'gemini' | null;
  enableCloudSync: boolean;
  enableAdvancedNLP: boolean;
}

class FeatureFlagManager {
  private flags: FeatureFlags = {
    enableAI: false,
    aiProvider: null,
    enableCloudSync: false,
    enableAdvancedNLP: true, // Always enable local NLP
  };

  constructor() {
    this.loadFlags();
  }

  private loadFlags(): void {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('featureFlags');
        if (stored) {
          this.flags = JSON.parse(stored);
        }
      }
    } catch (error) {
      console.warn('Failed to load feature flags:', error);
    }
  }

  public saveFlags(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('featureFlags', JSON.stringify(this.flags));
      }
    } catch (error) {
      console.error('Failed to save feature flags:', error);
    }
  }

  public getFlags(): FeatureFlags {
    return { ...this.flags };
  }

  public setFlag(key: keyof FeatureFlags, value: unknown): void {
    this.flags = { ...this.flags, [key]: value };
    this.saveFlags();
  }

  public isAIEnabled(): boolean {
    return this.flags.enableAI && this.flags.aiProvider !== null;
  }

  public getAIProvider(): FeatureFlags['aiProvider'] {
    return this.flags.aiProvider;
  }

  public enableAI(provider: 'openai' | 'gemini'): void {
    this.flags.enableAI = true;
    this.flags.aiProvider = provider;
    this.saveFlags();
  }

  public disableAI(): void {
    this.flags.enableAI = false;
    this.flags.aiProvider = null;
    this.saveFlags();
  }
}

export const featureFlags = new FeatureFlagManager();
