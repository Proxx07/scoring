<script setup lang="ts">
import { Message } from 'primevue';

const props = defineProps<{
  label?: string
  for?: string
  errorMessage?: string
  labelClass?: string
}>();
</script>

<template>
  <div class="form-label">
    <label
      v-if="props.label"
      :for="props.for"
      :class="props.labelClass"
      v-html="props.label"
    />
    <slot />
    <Message v-if="errorMessage" severity="error" class="w-full" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>

<style scoped lang="scss">
.form-label {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  label {
    font: var(--font-14-r);
    cursor: pointer;
  }
  &:has(input[type='checkbox']) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
