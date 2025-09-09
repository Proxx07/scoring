export type RouteNames = 'main' | 'registration' | 'identification' | 'user-info';

export const RouterEnum: Record<RouteNames, number> = {
  'main': 1,
  'registration': 2,
  'identification': 3,
  'user-info': 4,
};
