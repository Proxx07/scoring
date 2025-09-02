import type { AxiosError } from 'axios';
import axios from 'axios';
import { useToastService } from '@/composables/UI/';

const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

$axios.interceptors.request.use(
  (config) => {
    if (config.loading) config.loading.value = true;
    return config;
  },
);

$axios.interceptors.response.use(
  (response) => {
    if (response.data.error && typeof response.data.error === 'string') {
      const $toast = useToastService();
      $toast.error(response.data.error);
    }

    if (response.config.loading) {
      response.config.loading.value = false;
    }
    return response;
  },

  (error: AxiosError) => {
    if (error.message) {
      const $toast = useToastService();
      $toast.error(error.message);
    }

    if (error?.response?.config.loading) {
      error.response.config.loading.value = false;
    }
    return { error };
  },
);

export default $axios;
