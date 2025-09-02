<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useThemeMode } from '@/composables/UI/';
import AppLayout from '@/layouts/AppLayout.vue';

const { setTheme } = useThemeMode();

onBeforeMount(() => {
  setTheme();
});
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<style scoped lang="scss"></style>
