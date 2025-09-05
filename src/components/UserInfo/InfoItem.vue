<script setup lang="ts">
defineProps<{
  title: string
  value: string
}>();
</script>

<template>
  <div class="info">
    <div class="font-14-r">
      {{ title }}
    </div>
    <div class="font-16-b">
      {{ value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
