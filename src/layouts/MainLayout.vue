<template>
    <v-app>
        <the-header />

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';

export default {
    name: 'MainLayout',
    components: {
        TheHeader,
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
