import type { FormStepTypes, IAuthForm } from './types';
import { computed, ref } from 'vue';
import $axios from '@/api';
import { useTimer } from '@/composables/UI';
import { $confirm } from '@/plugins/confirmation.ts';
import { setAuthForm } from './models';

export const useUser = () => {
  const { start, time, isTimerActive } = useTimer();
  const form = ref<IAuthForm>(setAuthForm());
  const step = ref<FormStepTypes>('form');

  const otp = ref<string>('');
  const loading = ref(false);

  const formLoading = computed(() => loading.value && step.value === 'form');
  const otpLoading = computed(() => loading.value);
  const formSubmitHandler = async () => {
    if (isTimerActive.value || formLoading.value) return;
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    loading.value = false;
    start(1);
    step.value = 'otp';
  };

  const otpSubmitHandler = async () => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    loading.value = false;
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

  const fetchTestDataFromApi = async () => {
    const { data, error } = await $axios.get<string[]>('/api/partner/GetTariffs');
    console.log({ data, error });
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

    fetchTestDataFromApi,
  };
};
