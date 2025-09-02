<script setup lang="ts">
import { Button } from 'primevue';
import { computed } from 'vue';
import { backArrow } from '@/assets/icons';

const props = defineProps<{
  title?: string
  backEnabled?: boolean
  bgColor?: string
  textColor?: string
}>();

const emit = defineEmits<{
  (e: 'back-button-clicked'): void
}>();

const bg = computed<string>(() => props.bgColor ? props.bgColor : 'transparent');
const color = computed<string>(() => props.textColor ? props.textColor : 'inherit');
</script>

<template>
  <div class="page-wrapper">
    <div class="page-header">
      <Button
        v-if="props.backEnabled"
        :icon="backArrow"
        text
        class="back-button"
        @click="emit('back-button-clicked')"
      />
      <div v-if="props.title" class="title">
        {{ props.title }}
      </div>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  padding: 3rem 2.4rem;
  min-height: 100dvh;
  color: v-bind(color);
  background: v-bind(bg);
  transition: var(--transition-fast);
  position: relative;
  display: flex;
  flex-direction: column;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  min-height: 4.4rem;
  &:has(.back-button) {
    padding-right: 3.5rem;
  }
}
.back-button {
  --p-button-text-primary-color: var(--text-color);
  min-width: 3.5rem;
}

.title {
  flex-grow: 1;
  text-align: center;
  font: var(--font-22-b);
}

.page-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
