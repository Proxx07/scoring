<script setup lang="ts">
import PageWrapper from '@/components/UI/PageWrapper.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useStatusPage } from '@/composables/useStatusPage';

const { pageTitle, pageDescription, pageIcon } = useStatusPage();
</script>

<template>
  <PageWrapper :title="pageTitle">
    <div class="status-page">
      <VIcon :icon="pageIcon" class="icon" span-bg="var(--p-red-500)" color="var(--white)" />

      <div class="font-16-r">
        {{ pageDescription }}
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss">
.status-page {
  padding-top: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
}
.icon {
  width: 15rem;
  border-radius: var(--radius-round);
}
</style>
