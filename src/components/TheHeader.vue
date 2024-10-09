<template>
    <v-app-bar app color="header" dark elevate-on-scroll>
        <img src="/logo.png" style="width: 64px" />

        <v-toolbar-title>Книга до Книги</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-spacer></v-spacer>

        <v-btn variant="text" to="/search" class="mr-1">Пошук</v-btn>
        <v-menu open-on-hover location="bottom" :offset="[4, 3]" eager>
            <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" to="/exchanges" class="mr-1">Обміни</v-btn>
            </template>
            <div class="card d-flex flex-column rounded-0">
                <v-btn
                    variant="text"
                    rounded="0"
                    color="secondary"
                    :active="false"
                    to="/exchanges/current"
                >
                    Поточні
                </v-btn>
                <v-btn
                    variant="text"
                    rounded="0"
                    color="secondary"
                    to="/exchanges/history"
                    width="100%"
                    :active="false"
                >
                    Історія
                </v-btn>
            </div>
        </v-menu>
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
