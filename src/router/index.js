import { createRouter, createWebHistory } from 'vue-router';
import { beforeEach } from '@/router/beforeEach';
import authorized from './middleware/authorized';
import unauthorized from './middleware/unauthorized';
import { ROUTE_NAME_WELCOME, ROUTE_NAME_HOME } from '@/constants';

const routes = [
    {
        path: '/welcome',
        name: ROUTE_NAME_WELCOME,
        meta: {
            layout: 'empty',
            middleware: [unauthorized],
        },
        component: () => import('../views/WelcomeView.vue'),
    },
    {
        path: '/',
        name: ROUTE_NAME_HOME,
        component: () => import('../views/SearchView.vue'),
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
    },
    {
        path: '/history',
        name: 'history',
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/HistoryView.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/ProfileView.vue'),
    },
];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach(beforeEach);

export default router;
