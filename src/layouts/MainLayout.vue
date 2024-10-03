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
import { mapActions } from 'vuex';

export default {
    name: 'MainLayout',
    components: {
        TheSidebar,
    },
    mounted() {
        this.getAllBooks();
    },
    methods: {
        ...mapActions('common', ['getAllBooks']),
    },
};
</script>

<style scoped></style>
