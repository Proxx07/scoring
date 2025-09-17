export type RouteNames = 'main' | 'registration' | 'identification' | 'user-info' | 'payment-schedule' | 'credit-card';

export const RouterEnum: Record<RouteNames, number> = {
  'main': 1,
  'registration': 2,
  'identification': 3,
  'user-info': 4,
  'payment-schedule': 5,
  'credit-card': 6,
};
