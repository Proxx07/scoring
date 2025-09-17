import type { IProduct, ITariff } from './types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { useFetchStates } from '@/composables/UI';
import { useGlobalData } from '@/store/userGlobalData.ts';

export const useTariffs = () => {
  const globalStore = useGlobalData();

  const { loading } = useFetchStates();
  const tariffs = ref<ITariff[]>([]);

  const activeTariff = computed<ITariff | undefined>(() => {
    return tariffs.value.find(tariff => tariff.id === globalStore.tariffId);
  });

  const selectTariff = (tariff: ITariff) => {
    globalStore.setTariff(tariff.id);
  };

  const getTariffs = async () => {
    const { data, error } = await $axios.get('/api/partner/GetTariffs', { loading });
    tariffs.value = error ? [] : data;
  };

  const products = computed<IProduct[]>(() => globalStore.products);
  const productsTotalPrice = computed<number>(() => {
    return products.value.reduce((total, product) => total + product.price * product.quantity, 0);
  });

  return {
    products,
    productsTotalPrice,

    tariffs,
    loading,
    activeTariff,

    getTariffs,
    selectTariff,
  };
};
