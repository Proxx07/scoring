import type { ComputedRef, InjectionKey, Ref } from 'vue';

export type FormRule<V> = (value: V) => string | boolean;

export const IS_VALIDATED: InjectionKey<Ref<boolean>> = Symbol('isValidated');
export const ADD_FORM_VALIDATION_RULE: InjectionKey<(id: string, value: ComputedRef<boolean>) => () => boolean> = Symbol('addValidationToForm');

export interface IFormField<V extends string | number> {
  label?: string
  rules?: Array<FormRule<V>>
  modelValue: V
}

export type InputFieldProps<V extends string | number, P> = IFormField<V> & /* @vue-ignore */ P;

export interface IEmits<T> {
  (e: 'update:modelValue', value: T): void
}
