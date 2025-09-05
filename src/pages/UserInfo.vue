<script setup lang="ts">
import { Button } from 'primevue';
import { useI18n } from 'vue-i18n';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import InfoItem from '@/components/UserInfo/InfoItem.vue';

const { t } = useI18n();
/* const $router = useRouter(); */

const mockInfoItems = [
  { title: t('userInfo.fullName'), value: 'Arnold Theodore Shwarzenegger' },
  { title: t('userInfo.birthDate'), value: '12.12.2012' },
  { title: t('userInfo.phone'), value: '+998 90 000-00-00' },
  { title: t('userInfo.pinfl'), value: '77777777777777' },
  { title: t('userInfo.tin'), value: '777777' },
  { title: t('userInfo.district'), value: 'Район' },
  { title: t('userInfo.street'), value: 'Улица' },
];
</script>

<template>
  <PageWrapper
    title="Ваши данные"
    text-color="var(--black)"
    back-enabled
  >
    <div class="user-info">
      <div class="photo">
        PHOTO
      </div>
      <InfoItem
        v-for="(item, index) in mockInfoItems"
        :key="item.value"
        :title="item.title"
        :value="item.value"
        :class="[index > mockInfoItems.length - 2 && 'colspan-2']"
      />
      <div class="note">
        {{ t('userInfo.note') }}
      </div>
    </div>

    <Button :label="t('confirm')" fluid size="large" class="mt-auto" />
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
  color: var(--p-zinc-400);
  font: var(--font-14-r);
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
