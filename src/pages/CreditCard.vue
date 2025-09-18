<script setup lang="ts">
import { Button, Card, Skeleton } from 'primevue';
import { computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import Price from '@/components/UI/Price.vue';
import { useCreditCard } from '@/composables/useCreditCard';
import { useTariffs } from '@/composables/useTariffs';

const $route = useRouter();
const { t } = useI18n();

const { activeTariff, loading: tariffsLoading, getTariffs } = useTariffs();
const { pan, expiry, loading: cardLoading, createBankCard, time, isTimerActive } = useCreditCard();

const buttonText = computed(() => {
  if (cardLoading.value) return t('sending');
  if (isTimerActive.value) return t('main.resendTimer', { time: time.value });
  return t('add');
});

onBeforeMount(() => {
  getTariffs();
});
</script>

<template>
  <PageWrapper
    :title="t('creditCard.title')"
    back-enabled
    @back-button-clicked="$route.push({ name: 'payment-schedule' })"
  >
    <div class="card-page-top">
      <div class="font-18-r">
        {{ t('initialPayment') }}
      </div>

      <Card>
        <template #content>
          <Skeleton v-if="tariffsLoading" width="100%" height="3.5rem" />
          <Price v-else-if="activeTariff" :price="activeTariff.prepaymentAmount" class="font-20-r price" />
        </template>
      </Card>

      <div class="note">
        {{ t('creditCard.description') }}
      </div>
    </div>

    <div class="font-18-r">
      {{ t('creditCard.enterCard') }}
    </div>
    <VForm class="card-data" @submit-form="createBankCard">
      <VInputMask
        v-model="pan"
        mask="#### #### #### ####"
        placeholder="XXXX XXXX XXXX XXXX"
        unmask
        :pt="{ root: { inputmode: 'numeric' } }"
        :rules="[$formRules.required()]"
        :loading="cardLoading"
      />

      <VInputMask
        v-model="expiry"
        mask="##/##"
        placeholder="MM/YY"
        :pt="{ root: { inputmode: 'numeric' } }"
        :rules="[$formRules.required()]"
        :loading="cardLoading"
      />
      <Button
        type="submit"
        :label="buttonText"
        :loading="cardLoading"
        class="mt-auto colspan-2"
        size="large"
        fluid
        @click="$route.push({ name: 'credit-card' })"
      />
    </VForm>
  </PageWrapper>
</template>

<style scoped lang="scss">
.card-page-top {
  display: flex;
  flex-direction: column;
  gap: .7rem;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.card-data {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 30%;
  gap: 1.5rem;
  flex-grow: 1;
  padding-top: 1rem;
  @include media-max($small) {
    gap: 1rem;
  }
}

.price {
  padding: .8rem .7rem .7rem;
}

.note {
  font: var(--font-14-r);
  color: var(--secondary-800);
}
</style>
