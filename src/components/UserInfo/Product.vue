<script setup lang="ts">
import type { IProduct } from '@/composables/useTariffs/types';
import { Card } from 'primevue';
import Price from '@/components/UI/Price.vue';

defineProps<{
  product: IProduct
}>();
</script>

<template>
  <Card>
    <template #content>
      <div class="product-details">
        <div class="text-left">
          {{ product.name }}
        </div>

        <div class="text-center">
          X {{ product.quantity }}
        </div>

        <Price :price="product.price" class="text-right" />
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.product-details {
  padding: 1.1rem 0.4rem;
  font: var(--font-14-r);
  display: grid;
  grid-template-columns: auto 2.5rem auto;
  gap: .5rem;
  align-items: center;
}
</style>
