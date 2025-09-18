import type { FormStepTypes, IAuthForm } from './types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { useTimer } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { useGlobalData } from '@/store/userGlobalData.ts';
import { authFormDTO, setAuthForm } from './models';

export const useUser = () => {
  const { start, time, isTimerActive } = useTimer();
  const globalStore = useGlobalData();

  const form = ref<IAuthForm>(setAuthForm());
  const step = ref<FormStepTypes>('form');
  const otp = ref<string>('');

  const loading = ref(false);
  const formLoading = computed(() => loading.value && step.value === 'form');
  const otpLoading = computed(() => loading.value);

  const formSubmitHandler = async () => {
    if (isTimerActive.value || formLoading.value) return;

    const { data, error }
      = await $axios.post<string>('/api/partner/CreateContractor', { ...authFormDTO(form.value), productsInfo: globalStore.getProductsInfo() }, { loading });
    if (error) return;

    globalStore.userID = data;
    start(1);
    step.value = 'otp';
  };

  const otpSubmitHandler = async () => {
    const { data, error }
      = await $axios.post('/api/partner/ConfirmContractorSms', { contractorId: globalStore.userID, code: otp.value }, { loading });
    if (!data || error) return;

    step.value = 'identity';
  };

  const backHandle = async () => {
    if (step.value === 'otp') step.value = 'form';
    if (step.value === 'identity') {
      const ok = await $confirm.default({ title: 'confirmations.warning', subtitle: 'confirmations.backToMain' });
      if (!ok) return;
      otp.value = '';
      form.value = setAuthForm();
      step.value = 'form';
    }
  };

  return {
    form,
    step,
    otp,
    formLoading,
    otpLoading,
    time,
    isTimerActive,
    backHandle,
    otpSubmitHandler,
    formSubmitHandler,
  };
};
