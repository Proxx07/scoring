import type { IProduct, IRepaymentSchedule, ITariff } from './types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { useFetchStates } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { useGlobalData } from '@/store/userGlobalData.ts';

export const useTariffs = () => {
  const globalStore = useGlobalData();

  const { loading } = useFetchStates();
  const { loading: tariffSending } = useFetchStates();

  const tariffs = ref<ITariff[]>([]);
  const schedule = ref<IRepaymentSchedule[]>([]);

  const activeTariff = computed<ITariff | undefined>(() => {
    return tariffs.value.find(tariff => tariff.id === globalStore.tariffId);
  });

  const selectTariff = async (tariff: ITariff) => {
    if (tariffSending.value || tariff.id === globalStore.tariffId) return;
    const { error }
      = await $axios.post('/api/partner/SetTariffToOrder', { orderId: globalStore.orderId, tariffId: tariff.id }, { loading: tariffSending });
    if (!error) globalStore.tariffId = tariff.id;
  };

  const getTariffs = async () => {
    const { data, error }
      = await $axios.get('/api/partner/GetTariffs', { loading, params: { base64String: globalStore.hash } });
    tariffs.value = error ? [] : data;
    if (error || (globalStore.tariffId && !activeTariff.value)) {
      await $confirm.error({ title: 'statuses.close.title', subtitle: 'statuses.close.description' });
      await globalStore.closeWindowHandler();
    }
  };

  const getSchedule = async () => {
    const { data, error }
      = await $axios.get<{ repaymentSchedule: IRepaymentSchedule[] }>(`/api/partner/OrderRepaymentSchedule/${globalStore.orderId}`);
    if (!data || error) {
      schedule.value = [];
    }
    else {
      schedule.value = data.repaymentSchedule.map(item => ({ ...item, date: item.date.split('T')[0] }));
    }
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
    tariffSending,

    schedule,

    getTariffs,
    getSchedule,
    selectTariff,
  };
};
