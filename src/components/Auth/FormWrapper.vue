<script setup lang="ts">
import type { IAuthForm } from '@/composables/userUser/types';
import { Button, Checkbox } from 'primevue';
import { computed, nextTick, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FormLabel from '@/components/Form/FormLabel.vue';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';

const props = defineProps<{
  loading?: boolean
  buttonText?: string
  modelValue: IAuthForm
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: IAuthForm): void
  (e: 'submit-form'): void
}>();

const { t } = useI18n();

const form = ref({ ...props.modelValue });

const buttonText = computed(() => {
  if (props.loading) return t('sending');
  if (props.buttonText) return props.buttonText;
  return t('continue');
});

const submitHandler = () => {
  emit('update:modelValue', form.value);
  nextTick(() => {
    emit('submit-form');
  });
};
</script>

<template>
  <VForm @submit-form="submitHandler">
    <VInputMask
      v-model="form.passport"
      :label="t('form.passport')"
      :loading="loading"
      mask="AA/#######"
      placeholder="AA/#######"
      :rules="[$formRules.required()]"
    />

    <VInputMask
      v-model="form.birthDate"
      :label="t('form.birthDate')"
      :loading="loading"
      mask="##/##/####"
      placeholder="XX/XX/XXXX"
      :pt="{ root: { inputmode: 'numeric' } }"
      :rules="[$formRules.required(), $formRules.birthDate()]"
    />

    <VInputMask
      v-model="form.phone"
      :label="t('form.phone')"
      :loading="loading"
      mask="+### ## ### ## ##"
      placeholder="+998 ## ### ## ##"
      :pt="{ root: { inputmode: 'numeric' } }"
      :rules="[$formRules.required()]"
      unmask
    />

    <FormLabel :label="t('form.agreement')" for="check-1" label-class="font-10-r" class="mt-auto">
      <Checkbox v-model="form.agreement" binary input-id="check-1" required />
    </FormLabel>

    <Button type="submit" :label="buttonText" size="large" fluid :loading="loading" />
  </VForm>
</template>

<style scoped lang="scss"></style>
