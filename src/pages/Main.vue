<script setup lang="ts">
import { Button, Skeleton } from 'primevue';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import LangSwitcher from '@/components/UI/LangSwitcher.vue';
import PageWrapper from '@/components/UI/PageWrapper.vue';
import Price from '@/components/UI/Price.vue';
import Product from '@/components/UserInfo/Product.vue';
import Tariff from '@/components/UserInfo/Tariff.vue';
import { useTariffs } from '@/composables/useTariffs';

const {
  tariffs, loading, getTariffs,
  selectTariff, activeTariff,
  products, productsTotalPrice,
} = useTariffs();

const { t } = useI18n();
onBeforeMount(() => {
  getTariffs();
});
</script>

<template>
  <PageWrapper :title="t('chooseTariff')">
    <template #title-append>
      <LangSwitcher />
    </template>
    <div class="products-list">
      <div class="font-14-r">
        {{ t('products') }}
      </div>

      <Product v-for="(product, index) in products" :key="index" :product="product" />

      <div class="products-total-price">
        {{ t('productsSum') }}: <Price :price="productsTotalPrice" class="text-right" />
      </div>
    </div>
    <div class="products-list" style="padding-top: 2rem">
      <div class="font-16-r">
        {{ t('selectTariff') }}
      </div>

      <template v-if="loading">
        <Skeleton v-for="i in 3" :key="i" width="100%" height="10.3rem" />
      </template>
      <template v-else>
        <Tariff v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" :class="[tariff.id === activeTariff && 'active']" @click="selectTariff(tariff)" />
        <Tariff v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" :class="[tariff.id === activeTariff && 'active']" @click="selectTariff(tariff)" />
        <Tariff v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" :class="[tariff.id === activeTariff && 'active']" @click="selectTariff(tariff)" />
        <Tariff v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" :class="[tariff.id === activeTariff && 'active']" @click="selectTariff(tariff)" />
        <Tariff v-for="tariff in tariffs" :key="tariff.id" :tariff="tariff" :class="[tariff.id === activeTariff && 'active']" @click="selectTariff(tariff)" />
      </template>
    </div>
    <template #page-footer>
      <div class="footer">
        <div class="footer-top">
          {{ activeTariff ? 'Итоговая сумма' : t('selectTariff') }}
          <Price v-if="activeTariff" :price="10000" />
        </div>
        <Button fluid :label="t('confirm')" size="large" :disabled="!activeTariff" />
      </div>
    </template>
  </PageWrapper>
</template>

<style scoped lang="scss">
.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
}
.products-total-price {
  display: flex;
  align-items: center;
  gap: .5rem;
  justify-content: space-between;
  font: var(--font-14-r);
}

.footer {
  display: flex;
  flex-direction: column;
  gap: .6rem;
  .footer-top {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    font: var(--font-14-r);
  }
}
</style>
