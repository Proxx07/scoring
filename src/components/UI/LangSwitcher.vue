<script setup lang="ts">
import type { TLangs } from '@/plugins/i18n/models';
import { Select } from 'primevue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VIcon from '@/components/UI/VIcon.vue';
import { locales } from '@/plugins/i18n';
import { flagIcons, langNames, setCurrentLocale } from '@/plugins/i18n/models';

const { locale } = useI18n();

const selectedLang = computed(() => {
  return {
    name: langNames[locale.value as TLangs],
    icon: flagIcons[locale.value as TLangs],
  };
});

const lang = computed({
  get() {
    return locale.value;
  },
  set(value: TLangs) {
    setCurrentLocale(value);
    locale.value = value;
  },
});
</script>

<template>
  <div class="langs">
    <Select
      v-model="lang"
      :options="locales"
      option-value="value"
      option-label="name"
      class="lang-switcher"
    >
      <template #value>
        <div class="select-item">
          <VIcon :icon="selectedLang.icon" class="no-fill icon" />
          {{ selectedLang.name }}
        </div>
      </template>

      <template #option="slotProps">
        <div class="select-item">
          <VIcon :icon="slotProps.option.icon" class="no-fill icon" />
          {{ slotProps.option.name }}
        </div>
      </template>
    </Select>
  </div>
</template>

<style scoped lang="scss">
.lang-switcher {
  --p-select-dropdown-width: 2.6rem;
  --p-select-padding-y: 1rem;
  --p-select-padding-x: .5rem;
  --p-icon-size: 1rem;
  --p-select-background: transparent;
  border: 0 !important;
  box-shadow: none !important;
  :deep(.p-select-dropdown) {
    background: transparent;
    color: currentColor;
  }
}

.select-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  .icon {
    min-width: 2.5rem;
  }
}
</style>
