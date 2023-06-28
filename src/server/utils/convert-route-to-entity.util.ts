const mapping: Record<string, string> = {
  airdrops: 'airdrop',
  rewards: 'reward',
  startups: 'startup',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
