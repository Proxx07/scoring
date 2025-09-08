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

const bg = computed<string>(() => props.bgColor ? props.bgColor : 'var(--site-bg)');
const color = computed<string>(() => props.textColor ? props.textColor : 'var(--text-color)');
</script>

<template>
  <div class="page-wrapper">
    <div class="page-header content">
      <div class="side-items">
        <Button
          v-if="props.backEnabled"
          :icon="backArrow"
          text
          fluid
          class="back-button"
          @click="emit('back-button-clicked')"
        />
      </div>
      <div v-if="props.title" class="title">
        {{ props.title }}
      </div>
      <div class="side-items">
        <slot name="title-append" />
      </div>
    </div>
    <div class="page-content content">
      <slot />
    </div>

    <div class="page-footer content">
      <slot name="page-footer" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  @include media-max($mobile) {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
}
.page-wrapper {
  padding: 3rem 0 0;
  min-height: 100dvh;
  max-height: 100dvh;
  color: v-bind(color);
  background: v-bind(bg);
  transition: var(--transition-fast);
  position: relative;
  display: flex;
  flex-direction: column;
  .side-items {
    min-width: 9.5rem;
    max-width: 9.5rem;
  }
  @include media-max($mobile) {
    padding-top: 2.6rem;
    .side-items {
      min-width: 5rem;
      max-width: 5rem;
    }
  }
}
.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  min-height: 4.4rem;
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

.page-footer {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  color: v-bind(color);
  background: v-bind(bg);
  transition: var(--transition-fast);
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  @include media-max($mobile) {
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
  }
}
</style>
