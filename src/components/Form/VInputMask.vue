<script setup lang="ts">
import type { InputMaskProps } from 'primevue';
import type { IEmits, InputFieldProps } from '@/composables/Form/types';
import { InputMask } from 'primevue';

import FormLabel from '@/components/Form/FormLabel.vue';
import { useFormField } from '@/composables/Form';

const props = defineProps<InputFieldProps<string, InputMaskProps>>();
const emit = defineEmits<IEmits<string>>();

const { val, fieldValid, errorMessage } = useFormField<string, InputMaskProps>(props, emit);
</script>

<template>
  <FormLabel :label="props.label" :error-message="!fieldValid ? errorMessage : ''">
    <InputMask
      v-bind="{ ...props, ...$attrs }"
      v-model="val"
      :invalid="!fieldValid"
      unmask
    />
  </FormLabel>
</template>

<style scoped lang="scss"></style>
