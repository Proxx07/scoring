import type { RouteRecordRaw } from 'vue-router';
import { identificationMiddleware } from '@/middlewares/identificationMiddleware.ts';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/Main.vue'),
  },

  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/Registration.vue'),
  },

  {
    path: '/identification',
    name: 'identification',
    component: () => import('@/pages/Identification.vue'),
    beforeEnter: identificationMiddleware,
  },

  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('@/pages/UserInfo.vue'),
    beforeEnter: identificationMiddleware,
  },

  {
    path: '/payment-schedule',
    name: 'payment-schedule',
    component: () => import('@/pages/PaymentSchedule.vue'),
    beforeEnter: identificationMiddleware,

  },

  {
    path: '/credit-card',
    name: 'credit-card',
    component: () => import('@/pages/CreditCard.vue'),
    beforeEnter: identificationMiddleware,
  },

  {
    path: '/status/:type',
    name: 'status',
    component: () => import('@/pages/StatusPage.vue'),
  },

  {
    path: '/example',
    name: 'example',
    component: () => import('@/pages/Example.vue'),
    meta: {
      layout: 'Default',
    },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/Page404.vue'),
    meta: {
      layout: 'Empty',
    },
  },
];

export default routes;
