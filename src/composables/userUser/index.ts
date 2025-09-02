import type { FormStepTypes, IAuthForm } from './types';
import { ref } from 'vue';
import { $confirm } from '@/plugins/confirmation.ts';
import { confirmText, setAuthForm } from './models';

export const useUser = () => {
  const form = ref<IAuthForm>(setAuthForm());
  const step = ref<FormStepTypes>('form');

  const otp = ref<string>('');

  const formSubmitHandler = () => {
    step.value = 'otp';
  };

  const otpSubmitHandler = () => {
    step.value = 'identity';
  };

  const backHandle = async () => {
    if (step.value === 'otp') step.value = 'form';
    if (step.value === 'identity') {
      const ok = await $confirm.default(confirmText);
      if (!ok) return;
      step.value = 'form';
    }
  };

  return {
    form,
    step,
    otp,
    backHandle,
    otpSubmitHandler,
    formSubmitHandler,
  };
};
