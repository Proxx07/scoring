import type { IPassportData } from '@/composables/useFaceID/types';
import type { IHashDecodeObject, IProduct } from '@/composables/useTariffs/types';
import { useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { $confirm } from '@/plugins/confirmation.ts';

export const useGlobalData = defineStore('global-state', () => {
  const $router = useRouter();
  const userID = useSessionStorage<string>('user-id', '');
  const hash = useSessionStorage<string>('hash-token', '');
  const tariffId = useSessionStorage<string>('tariff-id', '');
  const passportData = useSessionStorage<IPassportData | undefined>('passport-data', undefined, { serializer: { read: value => value ? (JSON.parse(value) as IPassportData) : undefined, write: value => (value == null ? '' : JSON.stringify(value)) } });

  const orderId = ref<string>('');
  const products = ref<IProduct[]>([]);
  const isApproved = ref<boolean>(false);

  const closeWindowHandler = async () => {
    try {
      window.close();
      $router.push({ name: 'status', params: { type: 'close' } });
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
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

    if (error || !data?.products?.length || !data.orderId) {
      await $confirm.error({ title: 'toast.error', subtitle: 'confirmations.hashError' });
      return await closeWindowHandler();
    }

    orderId.value = data.orderId;
    products.value = data.products;
    isApproved.value = /* data.isApproved */ true;
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
    hash,
    tariffId,

    getHashInfo,
    getProductsInfo,
    closeWindowHandler,

    orderId,
    products,

    isApproved,
    passportData,
  };
});
