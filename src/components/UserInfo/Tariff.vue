<script setup lang="ts">
import type { ITariff } from '@/composables/useTariffs/types';
import { Card } from 'primevue';
import { useI18n } from 'vue-i18n';
import Price from '@/components/UI/Price.vue';

defineProps<{
  tariff: ITariff
}>();

const { t } = useI18n();
</script>

<template>
  <Card class="tariff-card">
    <template #content>
      <div class="font-14-r">
        <div class="tariff-top">
          <span>{{ tariff.name }}</span>
          <Price :price="tariff.markup * 10000" per-month />
        </div>
        <div class="tariff-bottom">
          {{ t('initialPayment') }}
          <Price :price="tariff.prepayPercent * 10000" />
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.tariff-card {
  border: 1px solid transparent;
  &.active {
    border-color: var(--primary-500);
  }
}
.tariff-top {
  display: flex;
  gap: .5rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.tariff-bottom {
  color: var(--secondary-800);
  display: flex;
  gap: .5rem;
  flex-direction: column;
}
</style>
