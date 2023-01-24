import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/arrival',
          name: 'arrival',
          component: HomeView,
          props: (route) => ({ query: route.query }),
        },
        {
          path: '/departure',
          name: 'departure',
          component: HomeView,
          props: (route) => ({ query: route.query }),
        },
      ],
    },
  ],
});

export default router;
