import { describe, it, expect, vi } from 'vitest';

vi.mock('react', () => ({
  default: {},
  createElement: () => null,
}));
vi.mock('react/jsx-dev-runtime', () => ({}));

describe('ui package', () => {
  it('exports Button', async () => {
    const mod = await import('./index');
    expect(typeof mod.Button).toBe('function');
  });
});
