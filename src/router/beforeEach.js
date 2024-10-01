import store from '@/store';
import middlewarePipeline from '@/router/middlewarePipeline';
import { ROUTE_NAME_WELCOME } from '@/constants';

export async function beforeEach(to, from, next) {
    const newNext = (value) => {
        value === false ? next({ name: ROUTE_NAME_WELCOME }) : next(value);
    };

    if (!to.matched.length) {
        next({ name: ROUTE_NAME_WELCOME });
    }

    const { middleware } = to.meta;

    if (!middleware) {
        return next();
    }

    const context = {
        to,
        from,
        next: newNext,
        store,
    };

    const needAuth = to.matched.some((route) => route.meta && route.meta.protected);

    if (!store.getters['auth/isAuthenticated'] && needAuth) {
        try {
            await store.dispatch('auth/checkAuth');
        } catch {
            return next({ name: ROUTE_NAME_WELCOME });
        }
    }

    return middleware[0]({
        ...context,
        nextMiddleware: middlewarePipeline(context, middleware, 1),
    });
}
