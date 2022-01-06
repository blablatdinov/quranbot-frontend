import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Charts',
    meta: { layout: 'main' },
    component: () => import('@/views/Charts.vue'),
  },
  {
    path: '/ayats',
    name: 'AyatsList',
    meta: { layout: 'main' },
    component: () => import('@/views/AyatsList.vue'),
  },
  {
    path: '/ayats/:id',
    name: 'AyatDetail',
    meta: { layout: 'main' },
    component: () => import('@/views/AyatDetail.vue'),
  },
  {
    path: '/content-generator',
    name: 'ContentGenerator',
    meta: { layout: 'main' },
    component: () => import('@/views/ContentGenerator.vue'),
  },
  {
    path: '/login/',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { layout: 'empty' },
    component: () => import('@/views/Logout.vue'),
  },
  {
    path: '/mailings',
    name: 'Mailings',
    meta: { layout: 'main' },
    component: () => import('@/views/Mailings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
