<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FormWrapper from '@/components/Auth/FormWrapper.vue';
import IdenityWrapper from '@/components/Auth/IdenityWrapper.vue';
import OtpWrapper from '@/components/Auth/OtpWrapper.vue';
import LangSwitcher from '@/components/UI/LangSwitcher.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useUser } from '@/composables/userUser';
import { orders } from '@/composables/userUser/models';

const { t } = useI18n();

const {
  form, step, otp, formLoading, otpLoading,
  time, isTimerActive,
  formSubmitHandler, otpSubmitHandler, backHandle,
} = useUser();

const bg = computed(() => step.value === 'otp' ? 'var(--primary-500)' : undefined);
const color = computed(() => step.value === 'otp' ? 'var(--primary-surface-color)' : undefined);
const title = computed<string>(() => step.value === 'form' ? t('main.title') : '');
const formButtonText = computed(() => isTimerActive.value ? t('main.resendTimer', { time: time.value }) : '');

const transitionName = ref('slide-in-right');
watch(step, (newValue, oldValue) => {
  const newIndex = orders.indexOf(newValue);
  const prevIndex = orders.indexOf(oldValue);
  transitionName.value = newIndex > prevIndex ? 'slide-in-right' : 'slide-in-left';
});
</script>

<template>
  <PageWrapper
    :title="title"
    :bg-color="bg"
    :text-color="color"
    :back-enabled="step !== 'form'"
    @back-button-clicked="backHandle"
  >
    <template v-if="step === 'form'" #title-append>
      <LangSwitcher />
    </template>
    <TransitionGroup :name="transitionName">
      <FormWrapper
        v-if="step === 'form'"
        v-model="form"
        :loading="formLoading"
        :button-text="formButtonText"
        class="form"
        @submit-form="formSubmitHandler"
      />

      <OtpWrapper
        v-if="step === 'otp'"
        v-model="otp"
        class="form"
        :resend-timer="time"
        :resend-enabled="!isTimerActive"
        :length="6"
        :loading="otpLoading"
        :phone="form.phone"
        @resend-code="formSubmitHandler"
        @submit-form="otpSubmitHandler"
      />

      <IdenityWrapper v-if="step === 'identity'" class="form" />
    </TransitionGroup>
  </PageWrapper>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  & + .form {
    position: absolute;
    inset: 0;
  }
}
.form-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>
