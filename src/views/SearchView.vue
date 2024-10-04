<template>
    <div class="search page-container">
        <div class="mb-6">
            <v-text-field
                v-model="search"
                placeholder="Type for search..."
                max-width="200"
                variant="underlined"
                :loading="isSearching"
                @update:model-value="handleSearchUpdate"
            />
        </div>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Author</th>
                    <th class="text-left">Year</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.name }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.year }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
    data() {
        return {
            books: [],
            search: '',
            isSearching: false,
        };
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        async getBooks() {
            try {
                const { data } = await this.axios.get('/book/all', {
                    params: {
                        search: this.search,
                    },
                });

                this.books = data;
            } catch (e) {
                console.error(e);
            }
        },
        handleSearchUpdate: debounce(async function (e) {
            this.isSearching = true;
            await this.getBooks();
            this.isSearching = false;
        }, 400),
    },
};
</script>
