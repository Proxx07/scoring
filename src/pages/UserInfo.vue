<script setup lang="ts">
import PageWrapper from '@/components/UI/PageWrapper.vue';
import InfoItem from '@/components/UserInfo/InfoItem.vue';

const mockInfoItems = [
  { title: 'Ф.И.О', value: 'Arnold Theodore Shwarzenegger' },
  { title: 'Дата рождения', value: '12.12.2012' },
  { title: 'Номер телефона', value: '+998 90 000-00-00' },
  { title: 'ПНФЛ', value: '77777777777777' },
  { title: 'ИНН', value: '777777' },
  { title: 'Район', value: 'Район' },
  { title: 'Улица', value: 'Улица' },
];
</script>

<template>
  <PageWrapper
    title="Ваши данные"
    bg-color="var(--primary-50)"
    back-enabled
  >
    <div class="user-info">
      <div class="photo">
        PHOTO
      </div>
      <InfoItem
        v-for="item in mockInfoItems"
        :key="item.value"
        :title="item.title"
        :value="item.value"
      />
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss">
.user-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;
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
