<template>
    <v-app>
        <v-app-bar app color="header" dark elevate-on-scroll>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Book Exchange</v-toolbar-title>

            <v-spacer></v-spacer>

            <google-login :callback="authCallback" class="mr-1" />
        </v-app-bar>

        <v-main class="mt-10">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import Cookies from 'js-cookie';
import { mapMutations } from 'vuex';
import { ROUTE_NAME_HOME } from '@/constants';

export default {
    name: 'EmptyLayout',
    methods: {
        ...mapMutations('auth', ['updateValue', 'saveToken']),
        authCallback({ credential }) {
            this.updateValue({ key: 'token', value: credential });
            Cookies.set('auth_token', credential);
            this.$router.push({ name: ROUTE_NAME_HOME });
        },
    },
};
</script>

<style scoped></style>
