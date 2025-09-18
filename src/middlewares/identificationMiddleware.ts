import type { RouteLocationNormalized } from 'vue-router';
import type { RouteNames } from '@/router/types';
import { useGlobalData } from '@/store/userGlobalData.ts';

const noIdRedirectRoutes: RouteNames[] = ['user-info', 'credit-card', 'payment-schedule'];

export const identificationMiddleware = (to: RouteLocationNormalized) => {
  const globalStore = useGlobalData();
  if (noIdRedirectRoutes.includes(to.name as RouteNames)) {
    if (!globalStore.passportData) return { name: 'identification' };
    return true;
  }
  if (to.name === 'identification' && globalStore.passportData) return { name: 'user-info' };
  return true;
};
