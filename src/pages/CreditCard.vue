<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router';
import PageWrapper from '@/components/UI/PageWrapper.vue';

const $route = useRouter();
</script>

<template>
  <PageWrapper
    title="Добавление карты"
    back-enabled
    @back-button-clicked="$route.push({ name: 'payment-schedule' })"
  >
    { CONTENT }

    <Button label="Добавить" size="large" class="mt-auto" fluid @click="$route.push({ name: 'credit-card' })" />
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
