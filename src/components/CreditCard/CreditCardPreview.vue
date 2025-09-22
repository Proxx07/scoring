<script setup lang="ts">
import type { ICard } from '@/composables/useCreditCard/types';
import { Button, Card } from 'primevue';
import { computed } from 'vue';
import { eyeClosedIcon, eyeIcon, uzcard } from '@/assets/icons';
import TransitionContainer from '@/components/UI/TransitionContainer.vue';
import VIcon from '@/components/UI/VIcon.vue';
import { useThemeMode, useToggle } from '@/composables/UI';
import { chipIcon, humoIcon } from '@/composables/useCreditCard/model';

const props = defineProps<{
  card: ICard
}>();

const { isDark } = useThemeMode();
const { show, toggle } = useToggle();
const eyeButtonIcon = computed(() => show.value ? eyeClosedIcon : eyeIcon);
const pan = computed(() => {
  const str = props.card.pan.match(/.{1,4}/g) || [];
  return show.value ? str.join(' ') : str.map((s, i) => (i === 1 || i === 2) ? ' ####' : s).join(' ');
});
</script>

<template>
  <Card class="card-preview">
    <template #content>
      <div class="card-content">
        <div class="title">
          Credit card
        </div>
        <div class="type">
          <img v-if="card.type === 'humo'" :src="humoIcon" alt="HUMO" class="icon" style="margin: 1rem">
          <VIcon v-else-if="card.type === 'uzcard'" :icon="uzcard" :no-fill="!isDark" color="var(--text-color)" class="icon" />
        </div>
        <img :src="chipIcon" alt="sim-card-chip" class="chip colspan-2">
        <div class="pan">
          <TransitionContainer name="fade" :key-id="pan">
            {{ pan }}
          </TransitionContainer>
          <Button text severity="contrast" size="small" class="eye-button" @click="toggle">
            <VIcon :icon="eyeButtonIcon" />
          </Button>
        </div>
        <div class="validity">
          <span class="font-10-r">
            VALID <br> THRU
          </span>
          {{ card.expiry }}
        </div>

        <div class="holder-name">
          {{ card.holderName }}
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.card-preview {
  --p-card-body-padding: 3.2rem 2rem;
  width: 100%;
  max-width: 67rem;
  margin: 0 auto;
  position: relative;
}
.card-content {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  align-items: center;
  gap: 2rem 1.2rem;
  @include media-max($mobile) {
    gap: 1.2rem 1.2rem;
  }
  .title {
    grid-column: span 8;
    font: var(--font-20-b);
  }
  .type {
    font-size: 0;
    position: absolute;
    right: 1rem;
    top: 1.6rem;
    .icon {
      max-width: 11rem;
    }
  }
  .pan {
    grid-column: span 8;
    font: var(--font-20-b);
    position: relative;
    .eye-button {
      position: absolute !important;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    @include media-max($mobile) {
      font: var(--font-18-b);
    }
  }
  .validity {
    font: var(--font-16-r);
    display: flex;
    align-items: center;
    gap: .5rem;
    grid-column: span 5;
    justify-content: flex-end;;
  }
  .holder-name {
    font: var(--font-20-b);
    grid-column: span 8;
    @include media-max($mobile) {
      font: var(--font-18-b);
    }
  }
  .chip {
    width: 100%;
    max-width: 7rem;
    @include media-max($mobile) {
      max-width: 5rem;
    }
  }
}

.colspan-4 {
  grid-column: span 4;
}
</style>
