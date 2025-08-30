// Shared types and schemas for cross-service contracts.

export type HealthStatus = {
  status: 'ok' | 'degraded' | 'down';
  service: 'api' | 'web' | 'worker' | 'agent';
};

export interface AgentPlanStep {
  id: string;
  action: string;
  input?: Record<string, unknown>;
}

export interface AgentPlan {
  goal: string;
  steps: AgentPlanStep[];
}

// JSON Schemas (lightweight, hand-written)
export const HealthStatusSchema = {
  $id: 'https://automation.local/schemas/HealthStatus.json',
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { enum: ['ok', 'degraded', 'down'] },
    service: { enum: ['api', 'web', 'worker', 'agent'] },
  },
  required: ['status', 'service'],
} as const;

export const AgentPlanSchema = {
  $id: 'https://automation.local/schemas/AgentPlan.json',
  type: 'object',
  additionalProperties: false,
  properties: {
    goal: { type: 'string' },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
        properties: {
          id: { type: 'string' },
          action: { type: 'string' },
          input: { type: 'object' },
        },
        required: ['id', 'action'],
      },
    },
  },
  required: ['goal', 'steps'],
} as const;

