import { describe, it, expect } from 'vitest';
import * as sdk from './index';

describe('sdk package', () => {
  it('exports functions', () => {
    expect(typeof sdk.getHealth).toBe('function');
    expect(typeof sdk.getVersion).toBe('function');
  });
});

