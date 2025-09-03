import type { ComposerTranslation } from 'vue-i18n';
import type { FormRule } from '@/composables/Form/types';
import type { MessageSchema } from '@/plugins/i18n/types';

export const formRules = ($t: ComposerTranslation<MessageSchema>) => {
  return {
    required: (): FormRule<string | number> => (value: string | number) => !!value || $t('rules.required'),
    minLength: (opt: number): FormRule<string> => (value: string) => String(value).length >= opt || $t('rules.minLength', { opt }),
    minValue: (opt: number): FormRule<number> => (value: number) => value >= opt || $t('rules.minValue', { opt }),
  };
};

export type FormRules = ReturnType<typeof formRules>;
