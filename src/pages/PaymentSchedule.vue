<script setup lang="ts">
import { Badge, Button, Card, Skeleton } from 'primevue';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import Price from '@/components/UI/Price.vue';
import InfoItem from '@/components/UserInfo/InfoItem.vue';
import { useTariffs } from '@/composables/useTariffs';

const $route = useRouter();
const { t } = useI18n();
const { activeTariff, loading, getTariffs } = useTariffs();

onBeforeMount(() => {
  getTariffs();
});
</script>

<template>
  <PageWrapper :title="t('paymentsSchedule.title')">
    <Card>
      <template #content>
        <Skeleton v-if="loading" width="100%" height="12.4rem" />
        <div v-else-if="activeTariff" class="tariff-info">
          <InfoItem class="font-16-r" row :title="`${t('paymentsSchedule.installmentPeriod')}:`" :value="activeTariff.name" />
          <InfoItem class="font-16-r" row :title="`${t('initialPayment')}:`">
            <Price :price="activeTariff.prepaymentAmount" class="font-16-b" />
          </InfoItem>
          <InfoItem class="font-16-r" row :title="`${t('totalAmount')}:`">
            <Price :price="activeTariff.totalAmount" class="font-16-b" />
          </InfoItem>

          <Button :label="t('changeTariff')" severity="secondary" @click="$route.push({ name: 'main' })" />
        </div>
      </template>
    </Card>

    <Card class="schedule">
      <template #content>
        <div class="schedule-info">
          <div class="font-14-b" v-text="t('date')" />
          <div class="font-14-b" v-text="t('sum')" />
        </div>

        <div v-for="i in 24" :key="i" class="table-row schedule-info">
          <div class="table-item">
            <Badge :value="i" /> 01.01.2024
          </div>
          <Price :price="1000000" class="font-14-b" />
        </div>
      </template>
    </Card>

    <template #page-footer>
      <Button :label="t('confirm')" size="large" class="mt-auto" fluid @click="$route.push({ name: 'credit-card' })" />
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.tariff-info {
  padding: .4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.schedule {
  margin: 1.6rem 0 2rem;
}
.schedule-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
  padding-bottom: 1rem;
  align-items: center;
}

.table-row {
  padding: .5rem 0;
  border-bottom: 1px solid var(--secondary-600);
  font: var(--font-14-r);
  &:last-child {
    border-bottom: 0;
  }
}

.table-item {
  display: flex;
  align-items: center;
  gap: .5rem;
}
</style>
