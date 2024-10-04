<template>
    <v-navigation-drawer permanent width="300">
        <v-list>
            <v-list-item
                :prepend-avatar="userData.picture"
                :active="false"
                :to="{ name: ROUTE_NAME_PROFILE }"
            >
                <v-list-item-title>
                    {{ userData.first_name }} {{ userData.last_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ userData.email }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list :lines="false" nav>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
                @click="item.handler"
            >
                <template #prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ROUTE_NAME_MY_BOOKS, ROUTE_NAME_PROFILE, ROUTE_NAME_WELCOME } from '@/constants';

export default {
    name: 'TheSidebar',
    data() {
        return {
            ROUTE_NAME_PROFILE,
            items: [
                { text: 'My Books', icon: 'mdi-folder', handler: this.goToMyBooks },
                { text: 'Shared with me', icon: 'mdi-account-multiple' },
                { text: 'Recent', icon: 'mdi-history' },
                { text: 'Log out', icon: 'mdi-logout', handler: this.logoutHandler },
            ],
        };
    },
    computed: {
        ...mapGetters('auth', ['userData']),
    },
    methods: {
        ...mapActions('auth', ['logout']),
        logoutHandler() {
            this.logout();
            this.$router.push({ name: ROUTE_NAME_WELCOME });
        },
        goToMyBooks() {
            this.$router.push({ name: ROUTE_NAME_MY_BOOKS });
        },
    },
};
</script>

<style lang="scss">
.hook-color {
    color: $hook;
}
</style>
