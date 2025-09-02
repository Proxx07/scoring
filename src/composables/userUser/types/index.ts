export interface IAuthForm {
  phone: string
  passport: string
  birthDate: string
  agreement: boolean
}

export type FormStepTypes = 'form' | 'otp' | 'identity';
