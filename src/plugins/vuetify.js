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
                    background: '#F8F9FA',
                    secondary: '#6C757D',
                    header: '#343A40',
                    'on-background': '#333',
                    'on-surface': '#212529',
                    surface: '#F8F9FA',
                    primary: '#007BFF',
                },
            },
        },
    },
});
