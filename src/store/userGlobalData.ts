import type { IHashDecodeObject, IProduct } from '@/composables/useTariffs/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { useSessionStorageHelper } from '@/composables/UI/';
import { $confirm } from '@/plugins/confirmation.ts';

export const useGlobalData = defineStore('global-state', () => {
  const $router = useRouter();
  const { value: userID, setValue: setUserID } = useSessionStorageHelper<string>('user-id', '');
  const { value: hash, setValue: setHash } = useSessionStorageHelper<string>('hash-token', '');
  const { value: tariffId, setValue: setTariff } = useSessionStorageHelper<string>('tariff-id', '');

  const orderId = ref<string>('');
  const products = ref<IProduct[]>([]);

  const closeWindowHandler = async () => {
    setHash('');
    try {
      window.close();
    }
    catch (error) {
      $router.push({ name: 'status', params: { type: 'close' } });
    }
  };

  const getHashInfo = async () => {
    if (!hash.value) {
      await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.hashError' });
      return await closeWindowHandler();
    }

    const { data, error }
      = await $axios.get<IHashDecodeObject>(`/api/partner/DecodeBase64String/${hash.value}`);
    if (error || !data.products.length || !data.orderId) {
      await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.hashError' });
      return await closeWindowHandler();
    }

    orderId.value = data.orderId;
    products.value = data.products;
  };

  const getProductsInfo = () => {
    return {
      tariffId: tariffId.value,
      orderId: orderId.value,
      products: products.value,
    };
  };

  return {
    userID,
    setUserID,

    hash,
    setHash,

    tariffId,
    setTariff,

    getHashInfo,
    getProductsInfo,

    orderId,
    products,
  };
});
