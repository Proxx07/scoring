import type { FormStepTypes, IAuthForm } from '../types';

export const setAuthForm = (): IAuthForm => {
  return {
    phone: '',
    passport: '',
    birthDate: '',
    agreement: false,
  };
};

export const orders: FormStepTypes[] = ['form', 'otp', 'identity'];
