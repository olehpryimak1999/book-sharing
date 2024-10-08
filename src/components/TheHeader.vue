<template>
    <v-app-bar app color="header" dark elevate-on-scroll>
        <img src="/logo.png" style="width: 64px" />

        <v-toolbar-title>Книга до Книги</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-spacer></v-spacer>

        <v-btn variant="text" to="/search" class="mr-1">Пошук</v-btn>
        <v-btn variant="text" to="/exchanges" class="mr-1">Обміни</v-btn>
        <v-btn variant="text" to="/my-books" class="mr-1">Мої книги</v-btn>
        <v-btn variant="text" to="/profile">Профіль</v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'TheHeader',
};
</script>

<style scoped></style>
