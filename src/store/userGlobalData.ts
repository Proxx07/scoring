import type { IHashDecodeObject, IProduct } from '@/composables/useTariffs/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import $axios from '@/api';
import { useSessionStorageHelper } from '@/composables/UI/';
import { $confirm } from '@/plugins/confirmation.ts';

export const useGlobalData = defineStore('global-state', () => {
  const { value: userID, setValue: setUserID } = useSessionStorageHelper<string>('user-id', '');
  const { value: hash, setValue: setHash } = useSessionStorageHelper<string>('hash-token', '');
  const { value: tariffId, setValue: setTariff } = useSessionStorageHelper<string>('tariff-id', '');

  const orderId = ref<string>('');
  const products = ref<IProduct[]>([]);

  const closeWindowHandler = async () => {
    setHash('');
    await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.hashError' });
    window.close();
  };

  const getHashInfo = async () => {
    if (!hash.value) return await closeWindowHandler();

    const { data, error }
      = await $axios.get<IHashDecodeObject>(`/api/partner/DecodeBase64String/${hash.value}`);
    if (error) return await closeWindowHandler();

    orderId.value = data.orderId;
    products.value = data.products;
  };

  const getProductsInfo = () => {
    /*
      20d1be31-86b7-4fc5-b715-2cb6b419014d
    */
    return {
      tariffId: tariffId.value,
      orderId: /* orderId.value */ '24b48eb7-f3ec-4fa5-bbd5-f2e732f144c0',
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
