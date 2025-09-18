import type { ICard, ICardPostBody } from './types';
import { ref } from 'vue';
import $axios from '@/api';
import { useTimer } from '@/composables/UI';
import { useGlobalData } from '@/store/userGlobalData.ts';

export const useCreditCard = () => {
  const globalStore = useGlobalData();
  const { start, time, isTimerActive } = useTimer();

  const pan = ref<string>('');
  const expiry = ref<string>('');
  const loading = ref<boolean>(false);

  const otp = ref<string>('');
  const cardToken = ref<string>('');

  const setBody = (): ICardPostBody => {
    return {
      pan: pan.value,
      expiry: expiry.value.split('/').reverse().join('/'),
      contractorId: globalStore.userID,
    };
  };

  const createBankCard = async () => {
    if (loading.value || isTimerActive.value) return;

    const { data, error }
      = await $axios.post<string>('/api/partner/CreateBankCard', setBody(), { loading });

    if (!data || error) return;
    cardToken.value = data;
    start(1);
  };

  const confirmBankCard = async () => {
    if (loading.value) return;

    const { data, error }
      = await $axios.post<ICard>('/api/partner/ConfirmBankCard', { otp: otp.value, cardToken: cardToken.value }, { loading });
    if (error || !data) return;
    if (data) globalStore.passportData = { ...globalStore.passportData!, bankCard: { ...data } };
  };

  return {
    pan,
    expiry,
    loading,

    time,

    cardToken,
    isTimerActive,

    createBankCard,
    confirmBankCard,
  };
};
