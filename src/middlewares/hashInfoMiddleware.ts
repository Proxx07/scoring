import type { RouteLocationNormalized } from 'vue-router';
import { $confirm } from '@/plugins/confirmation.ts';
import { useGlobalData } from '@/store/userGlobalData.ts';

function getRawQueryParam(name: string): string {
  const search = window.location.search;
  const regex = new RegExp(`[?&]${name}=([^&]*)`);
  const match = search.match(regex);
  return match ? match[1] : '';
}

export const hashInfoMiddleware = async (to: RouteLocationNormalized) => {
  const globalStore = useGlobalData();
  const routerHash = getRawQueryParam('hash');

  if (to.name === 'status' || to.name === 'not-found') return true;

  if (routerHash) {
    globalStore.hash = routerHash;
    const url = new URL(window.location.href);
    url.searchParams.delete('hash');
    document.location.href = url.href;
  }
  else {
    if (!globalStore.orderId) {
      await globalStore.getHashInfo();
    }
    if (!globalStore.orderId || !globalStore?.products?.length) return;
  }

  if (globalStore.isApproved) return { name: 'status', params: { type: 'approved' } };

  if (to.name === 'main') return true;
  if (!globalStore.tariffId) {
    await $confirm.info({ title: 'confirmations.warning', subtitle: 'confirmations.tariff' });
    return { name: 'main' };
  }
  if (to.name === 'registration') return true;
  if (!globalStore.userID) {
    await $confirm.info({ title: 'confirmations.warning', subtitle: 'confirmations.auth' });
    return { name: 'registration' };
  }
};
