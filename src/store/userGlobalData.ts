import type { IHashDecodeObject, IProduct } from '@/composables/useTariffs/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import $axios from '@/api';
import { useLocalStorageHelper, useSessionStorageHelper } from '@/composables/UI/';
import { $confirm } from '@/plugins/confirmation.ts';

export const useGlobalData = defineStore('global-state', () => {
  const { value: userID, setValue: setUserID } = useLocalStorageHelper<string>('user-id', '');
  const { value: hash, setValue: setHash } = useSessionStorageHelper<string>('hash-token', '');
  const { value: tariffId, setValue: setTariff } = useSessionStorageHelper<string>('tariff-id', '');

  const orderId = ref<string>('');
  const products = ref<IProduct[]>([]);

  const closeWindowHandler = async () => {
    setHash('');
    await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.hashError' });
    alert('Close window');
  };

  const getHashInfo = async () => {
    if (!hash.value) return await closeWindowHandler();

    const { data, error }
      = await $axios.get<IHashDecodeObject>(`/api/partner/DecodeBase64String/${hash.value}`);
    if (error) return await closeWindowHandler();

    orderId.value = data.orderId;
    products.value = data.products;
  };

  return {
    userID,
    setUserID,

    hash,
    setHash,

    tariffId,
    setTariff,

    getHashInfo,

    orderId,
    products,
  };
});
