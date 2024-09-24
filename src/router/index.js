import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                layout: 'main',
            },
        },
        {
            path: '/about',
            name: 'about',
            meta: {
                layout: 'empty',
            },
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/history',
            name: 'history',
            meta: {
                layout: 'main',
            },
            component: () => import('../views/HistoryView.vue'),
        },
        {
            path: '/search',
            name: 'search',
            meta: {
                layout: 'main',
            },
            component: () => import('../views/SearchView.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {
                layout: 'main',
            },
            component: () => import('../views/ProfileView.vue'),
        },
    ],
});

export default router;
