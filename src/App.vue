<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useThemeMode } from '@/composables/UI/';
import AppLayout from '@/layouts/AppLayout.vue';
import { getCurrentLocale, setCurrentLocale } from '@/plugins/i18n/models';

const { setTheme } = useThemeMode();

onBeforeMount(() => {
  setCurrentLocale(getCurrentLocale());
  setTheme();
});
</script>

<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<style scoped lang="scss"></style>
