<script setup lang="ts">
import type { IAuthForm } from '@/composables/userUser/types';
import { Button, Checkbox } from 'primevue';
import FormLabel from '@/components/Form/FormLabel.vue';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import { checkBoxText } from '@/composables/userUser/models';

const props = defineProps<{
  modelValue: IAuthForm
}>();

const emit = defineEmits<{
  (e: 'submit-form'): void
}>();
</script>

<template>
  <VForm @submit-form="emit('submit-form')">
    <VInputMask
      v-model="modelValue.passport"
      label="Серия / номер паспорта"
      mask="aa/9999999"
      placeholder="AA/#######"
      :rules="[$formRules.required()]"
    />

    <VInputMask
      v-model="modelValue.birthDate"
      label="Дата рождения"
      mask="99/99/9999"
      placeholder="XX/XX/XXXX"
      :rules="[$formRules.required()]"
    />

    <VInputMask
      v-model="modelValue.phone"
      label="Номер телефона"
      mask="+999 99 999 99 99"
      placeholder="+998 99 999 99 99"
      :rules="[$formRules.required()]"
    />

    <FormLabel :label="checkBoxText" for="check-1" label-class="font-10-r" class="mt-auto">
      <Checkbox v-model="modelValue.agreement" binary input-id="check-1" />
    </FormLabel>

    <Button type="submit" label="Продолжить" size="large" fluid />
  </VForm>
</template>

<style scoped lang="scss"></style>
