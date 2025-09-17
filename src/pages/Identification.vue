<script setup lang="ts">
import type { IPassportData } from '@/composables/useFaceID/types';
import { Button } from 'primevue';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import $axios from '@/api';
import { reload } from '@/assets/icons';
import FaceId from '@/components/Auth/FaceId.vue';
import { useGlobalData } from '@/store/userGlobalData.ts';

const globalStore = useGlobalData();

const restartVideoSourceCount = ref(0);
const faceIdActive = ref<boolean>(true);

const videoError = ref(false);
const photoChecking = ref(false);

const responseStatus = ref<string>('');

// const $router = useRouter();

const handleCameraActive = () => {
  faceIdActive.value = !document.hidden;
};

const handlePhoto = async (imageBlob: Blob) => {
  photoChecking.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  const formData = new FormData();
  formData.append('ContractorId', globalStore.userID);
  formData.append('Image', imageBlob);

  const { data, error } = await $axios.post<IPassportData>('/api/partner/ConfirmIdentification', formData);
  photoChecking.value = false;
  if (error || !data) {
    if (error?.response?.data && typeof error.response.data === 'string') {
      responseStatus.value = error.response.data;
    }
    else {
      responseStatus.value = 'faceIdError';
    }
  }
  else {
    responseStatus.value = 'faceIdSuccess';
    console.log(data);
  }
};

const restartVideo = () => {
  faceIdActive.value = false;
  if (restartVideoSourceCount.value === 3) {
    videoError.value = true;
  }
  else {
    setTimeout(() => {
      faceIdActive.value = true;
      restartVideoSourceCount.value++;
    });
  }
};
const reloadPage = () => {
  document.location.reload();
};

onBeforeMount(() => {
  document.addEventListener('visibilitychange', handleCameraActive);
});

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleCameraActive);
});
</script>

<template>
  <div class="main-page face-id-page">
    <FaceId
      v-if="faceIdActive && !videoError"
      :loading="photoChecking"
      :response-status="responseStatus"
      @restart="restartVideo"
      @photo-taken="handlePhoto"
      @face-id-refreshed="responseStatus = ''"
    />
    <div v-if="videoError" class="error-wrapper">
      <h3>
        Не удалось запустить камеру. <br>
        Убедитесь, что доступ к камере не ограничен.<br>
        И попбробуйте обновить страницу.
      </h3>

      <Button severity="primary" label="Обновить" size="large" :icon="reload" icon-pos="right" @click="reloadPage" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  display: flex;
  width: 100%;
}

.error-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
  h3 {
    font: var(--font-24-b);
    text-align: center;
    line-height: 1.2;
  }
}
</style>
