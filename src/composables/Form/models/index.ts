import type { FormRule } from '@/composables/Form/types';

// type RuleFactory<Args extends any[] = []> = (...args: Args) => FormRule<string | number>;

export const formRules = {

  required: (): FormRule<string | number> => (value: string | number) => !!value || 'Required field!',

  minLength: (opt: number): FormRule<string> => (value: string) => String(value).length >= opt || `Length must be greater than ${opt}`,

  minValue: (opt: number): FormRule<number> => (value: number) => value >= opt || `Value must be greater than ${opt}`,

};
