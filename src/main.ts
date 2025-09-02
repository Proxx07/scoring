import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';

import App from '@/App.vue';
import { formRules } from '@/composables/Form/models';
import { i18n } from '@/plugins/i18n';
import { options } from '@/plugins/PrimeVue';
import router from '@/router/router.ts';
import '@/styles/main.scss';

const app = createApp(App);

const pinia = createPinia();

app
  .use(i18n)
  .use(pinia)
  .use(router)
  .use(PrimeVue, options)
  .use(ToastService)
  .mount('#app');

app.config.globalProperties.$tl = i18n.global.t;
app.config.globalProperties.$formRules = formRules;
