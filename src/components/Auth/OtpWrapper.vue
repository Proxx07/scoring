<script setup lang="ts">
import { Button, InputOtp } from 'primevue';

const props = defineProps<{
  modelValue: string
  phone: string
}>();

const emit = defineEmits<{
  (e: 'submit-form'): void
}>();

const otp = defineModel<string>('modelValue');

const submit = () => {
  emit('submit-form');
};
</script>

<template>
  <div>
    <div class="font-30-b">
      Введите SMS-код
    </div>

    <div class="font-14-r">
      SMS-код был выслан на номер
      <div class="font-22-r" style="margin: .6rem 0">
        +{{ props.phone }}
      </div>
      Введите его ниже, чтобы продолжить.
    </div>

    <InputOtp v-model="otp" />

    <Button label="Далее" size="large" severity="secondary" class="mt-auto" fluid @click="submit" />
  </div>
</template>

<style scoped lang="scss">

</style>
