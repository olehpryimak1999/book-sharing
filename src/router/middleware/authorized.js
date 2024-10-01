import { ROUTE_NAME_WELCOME } from '@/constants';

export default function ({ store, next, nextMiddleware }) {
    if (!store.getters['auth/isAuthenticated']) {
        return next({ name: ROUTE_NAME_WELCOME });
    }

    return nextMiddleware();
}
