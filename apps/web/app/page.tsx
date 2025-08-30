import { getHealth } from '@automation/sdk';
import { HomeClient } from '../src/features/home/routes';

export default async function Page() {
  const health = await getHealth();
  return <HomeClient status={health.status} />;
}

