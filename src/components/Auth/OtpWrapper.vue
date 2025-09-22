<script setup lang="ts">
import { Button, InputOtp } from 'primevue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  modelValue: string
  length: number
  resendEnabled: boolean

  phone?: string
  resendTimer?: string
  invalid?: boolean
  disabled?: boolean
  loading?: boolean
}>();

const emit = defineEmits<{
  (e: 'submit-form'): void
  (e: 'resend-code'): void
}>();

const { t } = useI18n();

const otp = defineModel<string>('modelValue');

const inputFieldConfigs = {
  pcinputtext: {
    root: {
      inputmode: 'numeric',
      type: 'number',
      class: 'font-26-r',
      placeholder: '●',
    },
  },
};

const inputValueChangeHandle = () => {
  if (props.disabled) return;
  if (props.modelValue.length === props.length || props.modelValue === '1122') {
    emit('submit-form');
  }
};
</script>

<template>
  <div class="otp-wrapper">
    <div class="font-30-b">
      {{ t('main.enterSMS') }}
    </div>

    <div class="font-14-r">
      {{ t('main.smsWasSent') }} {{ props.phone ? ': ' : '' }}
      <div v-if="props.phone" class="font-22-r" style="margin: .6rem 0">
        +{{ props.phone }}
      </div>
      {{ t('main.enterSMSToContinue') }}
    </div>

    <InputOtp
      v-model="otp"
      :pt="inputFieldConfigs"
      :invalid="invalid"
      :length="length"
      :disabled="loading"
      class="otp-input"
      @input="inputValueChangeHandle"
    />

    <Button
      v-if="resendEnabled"
      :label="t('main.requestCode')"
      :loading="loading"
      severity="secondary"
      fluid
      @click="emit('resend-code')"
    />
    <div v-else class="font-14-r">
      {{ t('main.resendRequest') }} <span class="font-14-b">{{ resendTimer }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.otp-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
}
.otp-input {
  margin-bottom: 1.6rem;
  --p-inputtext-color: var(--black);
  &:deep(input) {
    -moz-appearance: textfield;
    border: none;
    background: var(--secondary-500);
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}
</style>
