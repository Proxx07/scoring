<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import OtpWrapper from '@/components/Auth/OtpWrapper.vue';
import CreditCardForm from '@/components/CreditCard/CreditCardForm.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import { useCreditCard } from '@/composables/useCreditCard';
import { useTariffs } from '@/composables/useTariffs';

const $route = useRouter();
const { t } = useI18n();

const { activeTariff, loading: tariffsLoading, getTariffs } = useTariffs();
const {
  pan, expiry, loading: cardLoading, cardToken, cardInfo,
  otp, time, isTimerActive, createBankCard, confirmBankCard, confirmInstallment,
} = useCreditCard();

const bg = computed(() => cardToken.value ? 'var(--primary-500)' : undefined);
const color = computed(() => cardToken.value ? 'var(--primary-surface-color)' : undefined);
const title = computed<string>(() => !cardToken.value ? t('creditCard.title') : '');

const buttonText = computed(() => {
  if (cardLoading.value) return t('sending');
  if (isTimerActive.value) return t('main.resendTimer', { time: time.value });
  if (cardInfo.value) return t('confirm');
  return t('add');
});

const backClickHandler = () => {
  if (cardToken.value) {
    cardToken.value = '';
  }
  else {
    $route.push({ name: 'payment-schedule' });
  }
};

const transitionName = computed(() => cardToken.value ? 'slide-in-right' : 'slide-in-left');

onBeforeMount(() => {
  getTariffs();
});
</script>

<template>
  <PageWrapper
    :title="title"
    :text-color="color"
    :bg-color="bg"
    back-enabled
    @back-button-clicked="backClickHandler"
  >
    <TransitionGroup :name="transitionName">
      <CreditCardForm
        v-if="!cardToken"
        v-model:pan="pan"
        v-model:expiry="expiry"
        class="form"
        :active-card="cardInfo"
        :active-tariff="activeTariff"
        :button-text="buttonText"
        :card-loading="cardLoading"
        :tariffs-loading="tariffsLoading"
        @create-card="createBankCard"
        @submit-pay="confirmInstallment"
      />

      <OtpWrapper
        v-else
        v-model="otp"
        class="form"
        :resend-timer="time"
        :resend-enabled="!isTimerActive"
        :length="6"
        :loading="cardLoading"
        @resend-code="createBankCard"
        @submit-form="confirmBankCard"
      />
    </TransitionGroup>
  </PageWrapper>
</template>

<style scoped lang="scss">
.form + .form {
  position: absolute;
  inset: 0;
  left: var(--px);
  right: var(--px);
}
</style>
