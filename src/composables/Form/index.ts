import type { IEmits, IFormField } from './types';
import { computed, inject, onBeforeMount, onBeforeUnmount, useId } from 'vue';
import { ADD_FORM_VALIDATION_RULE, IS_VALIDATED } from './types';

export const useFormField = <MODEL_VALUE_TYPE extends string | number, FIELD_PROPS>(props: IFormField<MODEL_VALUE_TYPE> & FIELD_PROPS, emit: IEmits<MODEL_VALUE_TYPE>) => {
  let removeValidationRule: () => boolean;
  const id = useId();
  const isValidated = inject(IS_VALIDATED);
  const addValidationToForm = inject(ADD_FORM_VALIDATION_RULE);

  const val = computed<MODEL_VALUE_TYPE | undefined>({
    get() {
      return props.modelValue;
    },

    set(value: MODEL_VALUE_TYPE | undefined) {
      if (typeof value === 'undefined') return;
      emit('update:modelValue', value);
    },
  });

  const errorMessage = computed(() => {
    if (!props.rules || !props.rules.length) return '';
    for (const rule of props.rules) {
      if (typeof val.value !== 'undefined' && typeof rule(val.value) === 'string') {
        return rule(props.modelValue) as string;
      }
    }
    return '';
  });

  const fieldValid = computed(() => !isValidated?.value || !errorMessage.value);

  onBeforeMount(() => {
    if (!props.rules || typeof addValidationToForm === 'undefined') return;
    removeValidationRule = addValidationToForm(id, fieldValid);
  });

  onBeforeUnmount(() => {
    if (removeValidationRule) removeValidationRule();
  });

  return { val, fieldValid, errorMessage };
};
