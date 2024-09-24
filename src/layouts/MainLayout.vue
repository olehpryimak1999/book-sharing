<template>
    <v-app>
        <v-app-bar :elevation="2">
            <v-app-bar-title>Books share</v-app-bar-title>
            <template #append>
                <v-btn icon="mdi-book-search" @click="$router.push({ name: 'search' })"></v-btn>
                <v-btn icon="mdi-bell"></v-btn>
                <v-btn icon="mdi-history" @click="$router.push({ name: 'history' })"></v-btn>
                <v-btn icon="mdi-cog" @click="$router.push({ name: 'profile' })"></v-btn>
            </template>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'MainLayout',
};
</script>

<style scoped></style>
