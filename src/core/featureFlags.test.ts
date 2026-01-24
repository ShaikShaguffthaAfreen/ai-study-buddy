import { featureFlags } from '@/core/featureFlags';

describe('Feature Flags', () => {
  beforeEach(() => {
    // Reset feature flags before each test
    featureFlags.disableAI();
  });

  it('should initialize with correct defaults', () => {
    const flags = featureFlags.getFlags();
    expect(flags.enableAI).toBe(false);
    expect(flags.enableAdvancedNLP).toBe(true);
  });

  it('should enable AI with a provider', () => {
    featureFlags.enableAI('openai');
    expect(featureFlags.isAIEnabled()).toBe(true);
    expect(featureFlags.getAIProvider()).toBe('openai');
  });

  it('should disable AI', () => {
    featureFlags.enableAI('gemini');
    expect(featureFlags.isAIEnabled()).toBe(true);
    featureFlags.disableAI();
    expect(featureFlags.isAIEnabled()).toBe(false);
  });

  it('should allow setting individual flags', () => {
    featureFlags.setFlag('enableCloudSync', true);
    const flags = featureFlags.getFlags();
    expect(flags.enableCloudSync).toBe(true);
  });

  it('should persist flags to localStorage', () => {
    featureFlags.enableAI('openai');
    featureFlags.saveFlags();

    const stored = localStorage.getItem('featureFlags');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.enableAI).toBe(true);
  });
});
