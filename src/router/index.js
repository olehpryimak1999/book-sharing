import { createRouter, createWebHistory } from 'vue-router';
import { beforeEach } from '@/router/beforeEach';
import authorized from './middleware/authorized';
import unauthorized from './middleware/unauthorized';
import {
    ROUTE_NAME_WELCOME,
    ROUTE_NAME_HOME,
    ROUTE_NAME_MY_BOOKS,
    ROUTE_NAME_PROFILE,
} from '@/constants';

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
        path: '/search',
        name: ROUTE_NAME_HOME,
        component: () => import('../views/BookSearch.vue'),
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
        name: ROUTE_NAME_PROFILE,
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/ProfileView.vue'),
    },
    {
        path: '/my-books',
        name: ROUTE_NAME_MY_BOOKS,
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/MyBooksView.vue'),
    },
    {
        path: '/book/:id',
        name: 'Book for exchange',
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/BookPage.vue'),
    },
];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach(beforeEach);

export default router;
