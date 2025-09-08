import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/Main.vue'),
  },

  {
    path: '/identification',
    name: 'identification',
    component: () => import('@/pages/Identification.vue'),
  },

  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('@/pages/UserInfo.vue'),
  },

  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/Registration.vue'),
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
