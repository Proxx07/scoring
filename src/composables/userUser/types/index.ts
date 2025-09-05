export interface IAuthForm {
  phone: string
  passport: string
  birthDate: string
  agreement: boolean
}

export interface IAuthFormDTO {
  phone1: string
  docSeries: string
  docNumber: string
  dateOfBirth: string
  docTypeId: 1
}

export type FormStepTypes = 'form' | 'otp' | 'identity';
