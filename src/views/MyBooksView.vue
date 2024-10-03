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
        </div>
        <v-dialog v-model="showDialog" max-width="450">
            <v-card>
                <v-card-title class="text-center">ADD NEW BOOK</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="newBook.book_id"
                            density="compact"
                            label="Book id"
                            variant="outlined"
                        ></v-text-field>
                        <v-file-input
                            v-model="newBook.file"
                            label="Upload boook photo"
                            variant="outlined"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        variant="outlined"
                        class="mr-2 px-4"
                        @click="showDialog = false"
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
    mounted() {
        this.getMyBooks();
    },
    methods: {
        async getMyBooks() {
            try {
                const { data } = await this.axios.get('/my-books');

                this.books = data;
            } catch (e) {
                console.error(e);
            }
        },
        async createBook() {
            try {
                const formData = new FormData();

                Object.entries(this.newBook).forEach(([field, value]) => {
                    formData.append(field, value);
                });

                await this.axios.post('/my-books', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.getMyBooks();
            } catch (e) {
                console.error(e);
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
    transition: transform 0.3s;
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    &:hover {
        transform: scale(1.05);
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
}
</style>
