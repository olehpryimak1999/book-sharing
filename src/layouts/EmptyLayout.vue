<template>
    <v-app>
        <v-app-bar :elevation="0">
            <div style="width: 100%">
                <div class="about-page-container">
                    <div class="d-flex justify-space-between align-center">
                        <v-app-bar-title style="font-size: 32px">Books share</v-app-bar-title>
                        <google-login :callback="authCallback" />
                    </div>
                </div>
            </div>
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
