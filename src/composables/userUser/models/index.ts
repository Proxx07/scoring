import type { FormStepTypes, IAuthForm, IAuthFormDTO } from '../types';

export const setAuthForm = (): IAuthForm => {
  return {
    phone: '',
    passport: '',
    birthDate: '', // dd/mm/year
    agreement: false,
  };
};

export const authFormDTO = (value: IAuthForm): IAuthFormDTO => {
  return {
    docSeries: value.passport.split('/')[0],
    docNumber: value.passport.split('/')[1],
    dateOfBirth: value.birthDate.split('/').reverse().join('-'),
    phone1: value.phone,
    docTypeId: 1,
  };
};

export const orders: FormStepTypes[] = ['form', 'otp', 'identity'];
