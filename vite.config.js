import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

export default defineConfig(() => ({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~': path.resolve(__dirname, './node_modules'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import 'src/styles/_grid.scss';`,
            },
        },
    },
    server: {
        port: '8080',
    },
    preview: {
        port: '8080',
    },
}));
