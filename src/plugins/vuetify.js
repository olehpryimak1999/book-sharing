import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
    components: {
        ...components,
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    directives,
    theme: {
        themes: {
            light: {
                colors: {
                    background: '#F6F8FF',
                    'on-background': '#566690',
                    'on-surface': '#566690',
                    surface: '#F6F8FF',
                },
            },
        },
    },
});
