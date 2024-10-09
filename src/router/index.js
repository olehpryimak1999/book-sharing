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
        path: '/exchanges',
        name: 'exchanges',
        meta: {
            layout: 'main',
            middleware: [authorized],
            protected: true,
        },
        component: () => import('../views/ExchangesPage.vue'),
        children: [
            { name: 'Exchanges redirect', path: '', redirect: { name: 'Current' } },
            {
                name: 'Current',
                path: 'current',
                meta: {
                    layout: 'main',
                    middleware: [authorized],
                    protected: true,
                },
                component: () => import('@/components/exchanges/Current.vue'),
            },
            {
                name: 'History',
                path: 'history',
                meta: {
                    layout: 'main',
                    middleware: [authorized],
                    protected: true,
                },
                component: () => import('@/components/exchanges/History.vue'),
            },
            {
                name: 'Requests',
                path: 'requests',
                meta: {
                    layout: 'main',
                    middleware: [authorized],
                    protected: true,
                },
                component: () => import('@/components/exchanges/Requests.vue'),
            },
        ],
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
