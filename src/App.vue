<template>
    <component :is="layout">
        <router-view />
    </component>
    <notifications group="success" position="bottom right">
        <template #body="{ item }">
            <div class="vue-notification success">
                <div class="my-notification">
                    <div class="notification-title">
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </template>
    </notifications>
    <notifications group="error" position="bottom right">
        <template #body="{ item }">
            <div class="vue-notification error">
                <div class="my-notification">
                    <div class="notification-title">
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </template>
    </notifications>
</template>
<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default {
    components: {
        EmptyLayout,
        MainLayout,
    },
    computed: {
        layout() {
            return (this.$route.meta.layout || 'empty') + '-layout';
        },
    },
};
</script>
<style lang="scss">
@import '@/assets/base.css';
@import '@/assets/common.scss';
</style>
