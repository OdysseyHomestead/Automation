import { describe, it, expect } from 'vitest';
import { HealthStatusSchema } from './index';

describe('schemas', () => {
  it('health status schema has required fields', () => {
    expect(HealthStatusSchema.properties).toHaveProperty('status');
    expect(HealthStatusSchema.properties).toHaveProperty('service');
  });
});

