import { useGlobalData } from '@/store/userGlobalData.ts';

export const hashInfoMiddleware = async () => {
  const globalStore = useGlobalData();
  const params = new URLSearchParams(window.location.search);
  const routerHash = params.get('hash') || '';

  if (routerHash) {
    globalStore.setHash(routerHash);
    const url = new URL(window.location.href);
    url.searchParams.delete('hash');
    document.location.href = url.href;
  }
  else {
    if (globalStore.orderId) return;
    await globalStore.getHashInfo();
  }
};
