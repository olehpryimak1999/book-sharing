<template>
    <v-container>
        <div class="d-flex justify-end mb-8">
            <v-btn color="primary" @click="showDialog = true">
                <v-icon class="mr-1">mdi-plus</v-icon>
                Add book
            </v-btn>
        </div>
        <div v-for="book in books" :key="book.id" class="card">
            <img :src="book.photo_link" alt="book.name" class="mr-4" />
            <div>
                <p class="mb-2">{{ book.name }}</p>
                <p class="mb-2">
                    Автор: <span class="text-secondary">{{ book.author }}</span>
                </p>
                <p>
                    Рік видання: <span class="text-secondary">{{ book.year }}</span>
                </p>
            </div>
            <v-btn
                icon
                variant="text"
                class="card__right-up-slot"
                width="32"
                height="32"
                @click="handleDeleteClick(book.id)"
            >
                <v-icon size="20">mdi-trash-can</v-icon>
            </v-btn>
        </div>
        <v-dialog v-model="showDialog" max-width="450">
            <v-card>
                <v-card-title class="text-center">ADD NEW BOOK</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-autocomplete
                            v-model="newBook.book_id"
                            :items="booksItems"
                            density="compact"
                            label="Book"
                            variant="outlined"
                        />
                        <v-file-input
                            v-model="newBook.file"
                            density="compact"
                            label="Upload boook photo"
                            variant="outlined"
                            prepend-icon=""
                            append-inner-icon="mdi-camera"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="px-6 pb-4">
                    <v-btn
                        color="primary"
                        variant="outlined"
                        class="mr-2 px-4"
                        @click="handleCancelClick"
                    >
                        Cancel
                    </v-btn>
                    <v-btn color="primary" variant="elevated" class="px-4" @click="createBook">
                        Create
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MyBooksView',
    data() {
        return {
            books: [],
            showDialog: false,
            newBook: {
                book_id: null,
                file: null,
            },
        };
    },
    computed: {
        ...mapGetters('common', ['booksItems']),
    },
    mounted() {
        this.getMyBooks();
    },
    methods: {
        async getMyBooks() {
            try {
                const { data } = await this.axios.get('/instance/my');

                this.books = data;
            } catch (e) {
                console.error(e);
            }
        },
        async handleCancelClick() {
            this.showDialog = false;
            this.newBook = {};
        },
        async createBook() {
            try {
                const formData = new FormData();

                Object.entries(this.newBook).forEach(([field, value]) => {
                    formData.append(field, value);
                });

                await this.axios.post('/instance/my', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.showDialog = false;
                this.newBook = {};

                this.getMyBooks();
            } catch (e) {
                console.error(e);
            }
        },
        async handleDeleteClick(id) {
            try {
                await this.axios.delete(`/instance/my/${id}`);
                this.getMyBooks();
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
