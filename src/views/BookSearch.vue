<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" class="mb-4">
                <v-text-field
                    v-model="searchQuery"
                    label="Пошук за назвою книги"
                    clearable
                    density="compact"
                    hide-details
                    @input="fetchBooks"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4" class="mb-4">
                <v-select
                    v-model="selectedAuthor"
                    :items="authors"
                    label="Автор"
                    density="compact"
                    clearable
                    hide-details
                    @change="fetchBooks"
                ></v-select>
            </v-col>

            <v-col cols="12" md="4" class="mb-4">
                <v-select
                    v-model="selectedCategory"
                    :items="categories"
                    label="Категорія"
                    density="compact"
                    clearable
                    hide-details
                    @change="fetchBooks"
                ></v-select>
            </v-col>

            <v-col cols="12" md="4" class="mb-4">
                <v-select
                    v-model="sortBy"
                    :items="sortOptions"
                    label="Сортувати за"
                    density="compact"
                    clearable
                    hide-details
                    @change="fetchBooks"
                ></v-select>
            </v-col>
        </v-row>

        <v-divider class="mb-4"></v-divider>

        <v-table class="table-background">
            <template #default>
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Автор</th>
                        <th>Категорія</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book.id">
                        <td>{{ book.name }}</td>
                        <td>{{ book.author }}</td>
                        <td>{{ book.category }}</td>
                        <td>
                            <v-btn
                                size="small"
                                variant="outlined"
                                color="primary"
                                :to="`/book/${book.id}`"
                            >
                                Позичити
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-table>

        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            class="mt-4"
            @input="fetchBooks"
        ></v-pagination>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            selectedAuthor: null,
            selectedCategory: null,
            sortBy: null,
            currentPage: 1,
            books: [],
            totalPages: 0,
            authors: [],
            categories: [],
            sortOptions: [
                { text: 'По алфавіту', value: 'title' },
                { text: 'За автором', value: 'author' },
                { text: 'За категорією', value: 'category' },
            ],
        };
    },
    methods: {
        async fetchBooks() {
            try {
                const { data } = await this.axios.get('/book/all', {
                    params: {
                        searchQuery: this.searchQuery,
                        selectedAuthor: this.selectedAuthor,
                        currentPage: this.currentPage,
                    },
                });

                this.books = data;
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.table-background {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
