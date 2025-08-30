import Fastify from 'fastify';
import { z } from 'zod';
import type { AgentPlan } from '@automation/core-domain';

const server = Fastify({ logger: true });

const PlanRequest = z.object({ goal: z.string().min(1) });

server.get('/health', async () => ({ status: 'ok', service: 'agent' }));

server.post('/agent/plan', async (req, rep) => {
  const parsed = PlanRequest.safeParse(req.body);
  if (!parsed.success) {
    return rep.status(400).send({ error: 'Invalid body', issues: parsed.error.issues });
  }
  const plan: AgentPlan = {
    goal: parsed.data.goal,
    steps: [
      { id: '1', action: 'analyze_goal', input: { goal: parsed.data.goal } },
      { id: '2', action: 'produce_plan' }
    ],
  };
  return plan;
});

const PORT = Number(process.env.AGENT_PORT || 8080);
server.listen({ port: PORT, host: '0.0.0.0' }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});

