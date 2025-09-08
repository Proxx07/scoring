import { createRouter, createWebHistory } from 'vue-router';
import { hashInfoMiddleware } from '@/middlewares/hashInfoMiddleware.ts';
import { layoutMiddleware } from '@/middlewares/layoutMiddleware.ts';
import routes from './routes.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(hashInfoMiddleware);
router.beforeEach(layoutMiddleware);
export default router;
