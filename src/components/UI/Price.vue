<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  price: number
  perMonth?: boolean
}>();
const { t } = useI18n();
</script>

<template>
  <div class="font-14-r">
    {{ price.toLocaleString('ru-RU') }}
    <span> {{ t('currency') }}{{ perMonth ? `/${t('month')}` : '' }}</span>
  </div>
</template>

<style scoped lang="scss">
div {
  color: var(--text-color);
}
span {
  color: var(--secondary-800);
  font-weight: normal;
}
</style>
