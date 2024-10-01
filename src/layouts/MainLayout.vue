<template>
    <v-app>
        <the-sidebar />

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue';

export default {
    name: 'MainLayout',
    components: {
        TheSidebar,
    },
};
</script>

<style scoped></style>
