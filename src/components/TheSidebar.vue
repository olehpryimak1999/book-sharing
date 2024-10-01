<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item
                :prepend-avatar="userData.profile_picture"
                :subtitle="userData.email"
                :title="userData.name"
            />
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
import { ROUTE_NAME_WELCOME } from '@/constants';

export default {
    name: 'TheSidebar',
    data() {
        return {
            items: [
                { text: 'My Books', icon: 'mdi-folder' },
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
    },
};
</script>

<style lang="scss">
.hook-color {
    color: $hook;
}
</style>
