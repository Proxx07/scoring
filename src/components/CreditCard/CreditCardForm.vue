<script setup lang="ts">
import type { ICard } from '@/composables/useCreditCard/types';
import type { ITariff } from '@/composables/useTariffs/types';
import { Button, Card, Skeleton } from 'primevue';
import { useI18n } from 'vue-i18n';
import CreditCardPreview from '@/components/CreditCard/CreditCardPreview.vue';
import VForm from '@/components/Form/VForm.vue';
import VInputMask from '@/components/Form/VInputMask.vue';
import Price from '@/components/UI/Price.vue';

defineProps<{
  pan: string
  expiry: string

  tariffsLoading: boolean
  cardLoading: boolean
  buttonText: string

  activeCard?: ICard

  activeTariff?: ITariff
}>();

const emit = defineEmits<{
  (e: 'create-card'): void
  (e: 'submit-pay'): void
}>();

const { t } = useI18n();

const panModel = defineModel<string>('pan', { required: true });
const expiryModel = defineModel<string>('expiry', { required: true });
</script>

<template>
  <div class="wrapper">
    <div class="form-top">
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

    <div v-if="!activeCard" class="font-18-r">
      {{ t('creditCard.enterCard') }}
    </div>
    <VForm v-if="!activeCard" class="card-data" @submit-form="emit('create-card')">
      <VInputMask
        v-model="panModel"
        mask="#### #### #### ####"
        placeholder="XXXX XXXX XXXX XXXX"
        unmask
        :pt="{ root: { inputmode: 'numeric' } }"
        :rules="[$formRules.required()]"
        :loading="cardLoading"
      />

      <VInputMask
        v-model="expiryModel"
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
      />
    </VForm>
    <div v-else class="card-preview-wrapper">
      <CreditCardPreview :card="activeCard" />

      <div class="note">
        {{ t('confirmations.cardPayments') }}
      </div>

      <!--
      <Button
        :label="buttonText"
        :loading="cardLoading"
        class="mt-auto"
        size="large"
        fluid
        @click="emit('submit-pay');"
      />
      -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.form-top {
  display: flex;
  flex-direction: column;
  gap: .7rem;
  padding-bottom: 3rem;
  padding-top: 2rem;
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
.card-preview-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
}

.price {
  padding: .8rem .7rem .7rem;
}

.note {
  font: var(--font-14-r);
  color: var(--secondary-800);
}
</style>
