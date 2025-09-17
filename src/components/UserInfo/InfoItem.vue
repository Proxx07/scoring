<script setup lang="ts">
defineProps<{
  title: string

  value?: string
  row?: boolean
}>();
</script>

<template>
  <div class="info" :class="[row && 'direction-row']">
    <div class="title">
      {{ title }}
    </div>
    <slot>
      <div class="font-16-b">
        {{ value }}
      </div>
    </slot>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  font: var(--font-14-r);
  &.direction-row {
    flex-direction: row;
  }
}
.title {
  opacity: 0.5;
}
</style>
