<template>
    <div class="page-container pt-16">
        <v-btn color="primary" @click="showDialog = true">
            <v-icon class="mr-1">mdi-plus</v-icon>
            Add book
        </v-btn>
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
            showDialog: false,
            newBook: {
                book_id: null,
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

                console.log(data);
            } catch (e) {
                console.error(e);
            }
        },
        async createBook() {
            try {
                const { data } = await this.axios.post('/my-books', this.newBook);

                console.log(data);
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style scoped></style>
