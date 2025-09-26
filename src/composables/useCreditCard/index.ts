import type { ICard, ICardPostBody } from './types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import $axios from '@/api';
import { useTimer } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { useGlobalData } from '@/store/userGlobalData.ts';

export const useCreditCard = () => {
  const globalStore = useGlobalData();
  const $router = useRouter();
  const { start, time, isTimerActive } = useTimer();

  const pan = ref<string>('');
  const expiry = ref<string>('');
  const loading = ref<boolean>(false);

  const otp = ref<string>('');
  const cardToken = ref<string>('');

  const cardInfo = computed<ICard | undefined>(() => globalStore.passportData?.bankCard);

  const setBody = (): ICardPostBody => {
    return {
      pan: pan.value,
      orderId: globalStore.orderId,
      expiry: expiry.value.split('/').reverse().join(''),
      /* contractorId: globalStore.userID, */
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
    if (data) {
      globalStore.passportData = { ...globalStore.passportData!, bankCard: { ...data } };
      cardToken.value = '';
      await $confirm.success({ title: 'toast.success', subtitle: 'confirmations.cardApplied' });
    }
  };

  const confirmInstallment = async () => {
    if (loading.value) return;
    const ok = await $confirm.default({
      title: 'confirmations.warning',
      subtitle: 'confirmations.numberConfirmation',
    });

    if (!ok) return;

    const { data, error }
      = await $axios.post(`/api/partner/ConfirmOrder/${globalStore.orderId}`, { loading });
    if (!data || error) return;

    await $confirm.success({ title: 'toast.success', subtitle: 'confirmations.cardPayments' });
    $router.push({ name: 'status', params: { type: 'approved' } });
  };

  const backClickHandler = () => {
    if (cardToken.value) {
      cardToken.value = '';
    }
    else {
      $router.push({ name: 'payment-schedule' });
    }
  };

  return {
    pan,
    expiry,
    loading,

    otp,
    time,

    cardInfo,
    cardToken,
    isTimerActive,

    createBankCard,
    confirmBankCard,
    confirmInstallment,
    backClickHandler,
  };
};
