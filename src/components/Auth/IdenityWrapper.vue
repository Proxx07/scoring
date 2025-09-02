<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const $router = useRouter();
</script>

<template>
  <div>
    <div class="font-30-b">
      Идентификация личности
    </div>

    <div class="text">
      <p>
        Для продолжения, пожалуйста, пройдите процесс идентификации. Это необходимо для обеспечения вашей безопасности и подтверждения вашей личности.
      </p>
      <p>
        Следуйте инструкциям, которые будут далее, чтобы завершить процесс.
      </p>
    </div>

    <Button label="Пройти" size="large" class="mt-auto" fluid @click="$router.push('/identification')" />
  </div>
</template>

<style scoped lang="scss">
.text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font: var(--font-14-r);
}
</style>
