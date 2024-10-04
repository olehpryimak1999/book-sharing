<template>
    <div class="page-container pt-16">
        <div class="d-flex justify-end mb-8">
            <v-btn color="primary" @click="showDialog = true">
                <v-icon class="mr-1">mdi-plus</v-icon>
                Add book
            </v-btn>
        </div>
        <div v-for="book in books" :key="book.id" class="book-card">
            <img :src="book.photo_link" alt="book.name" />
            <div class="book-info">
                <h2 class="book-title">{{ book.name }}</h2>
                <p class="book-author">Автор: {{ book.author }}</p>
                <p class="book-year">Рік видання: {{ book.year }}</p>
            </div>
            <v-btn
                icon
                variant="text"
                class="book-delete"
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
    </div>
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
                const { data } = await this.axios.get('/book/my');

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

                await this.axios.post('/book/my', formData, {
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
                await this.axios.delete(`/book/my/${id}`);
                this.getMyBooks();
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.book-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    transition: transform 0.3s;
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    &:hover {
        transform: scale(1.05);

        .book-delete {
            visibility: visible;
        }
    }

    img {
        width: auto;
        max-height: 250px;
    }

    .book-info {
        padding: 20px;
    }
    .book-title {
        font-size: 1.5em;
        color: #333;
        margin-bottom: 10px;
    }

    .book-author {
        font-size: 1.2em;
        color: #666;
    }

    .book-year {
        font-size: 1em;
        color: #999;
        margin-top: 10px;
    }

    .book-delete {
        position: absolute;
        top: 8px;
        right: 8px;
        visibility: hidden;
    }
}
</style>
