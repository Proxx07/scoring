<script setup lang="ts">
import { Button } from 'primevue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import InfoItem from '@/components/UserInfo/InfoItem.vue';
import { useGlobalData } from '@/store/userGlobalData.ts';

const { t } = useI18n();
const $router = useRouter();
const globalData = useGlobalData();

const userInfoItems = computed(() => [
  { title: t('userInfo.fullName'), value: `${globalData.passportData.surName} ${globalData.passportData.givenName} ${globalData.passportData.patronymic}` },
  { title: t('userInfo.sex'), value: globalData.passportData.sex },
  { title: t('userInfo.birthDate'), value: globalData.passportData.dateOfBirth },
  { title: t('userInfo.phone'), value: globalData.passportData.phone },
  { title: t('userInfo.pinfl'), value: globalData.passportData.pinfl },
  { title: t('userInfo.tin'), value: globalData.passportData.tin },
  { title: t('userInfo.address'), value: globalData.passportData.address },
]);
</script>

<template>
  <PageWrapper :title="t('userInfo.title')">
    <div class="user-info">
      <InfoItem
        v-for="(item, index) in userInfoItems"
        :key="item.value"
        :title="item.title"
        :value="item.value"
        :class="[index === userInfoItems.length - 1 && 'colspan-2']"
      />
      <div class="note">
        {{ t('userInfo.note') }}
      </div>
    </div>

    <Button :label="t('confirm')" fluid size="large" class="mt-auto" @click="$router.push({ name: 'payment-schedule' })" />
  </PageWrapper>
</template>

<style scoped lang="scss">
.user-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1.5rem;
  .colspan-2 {
    grid-column: span 2;
  }
}

.note {
  padding-top: 1.2rem;
  text-align: center;
  grid-column: span 2;
  font: var(--font-14-r);
  opacity: .6;
}

.photo {
  grid-row: span 3;
  border: 1px solid var(--primary-400);
  border-radius: var(--radius-l);
  display: flex;
  align-items: center;
  justify-content: center;
  font: var(--font-18-b);
}
</style>
