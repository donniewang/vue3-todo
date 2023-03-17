import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('./views/Home.vue') },
];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
