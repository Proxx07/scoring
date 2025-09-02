import type { FormStepTypes, IAuthForm } from '../types';

export const setAuthForm = (): IAuthForm => {
  return {
    phone: '',
    passport: '',
    birthDate: '',
    agreement: false,
  };
};

export const checkBoxText = `Я соглашаюсь с условиями <a href="#" target="_blank">публичной оферты</a> и даю свое согласие на обработку и использование моих персональных данных`;

export const confirmText = {
  title: 'Внимание!',
  subtitle: 'Вас вернёт на страницу авторизации, все заполненные раннее данные не будут сохранены',
};

export const orders: FormStepTypes[] = ['form', 'otp', 'identity'];
