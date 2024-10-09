<template>
    <v-container>
        <div class="d-flex justify-end mb-8">
            <v-btn color="primary" @click="showDialog = true">
                <v-icon class="mr-1">mdi-plus</v-icon>
                Add book
            </v-btn>
        </div>
        <v-row class="d-flex flex-wrap">
            <div v-for="book in books" :key="book.id" class="v-col-md-6 v-col-lg-4 mb-0 px-4">
                <div class="card mb-0">
                    <img :src="book.photo_link" alt="book.name" />
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
            </div>
        </v-row>
        <create-book v-model="showDialog" @update="getMyBooks" />
    </v-container>
</template>

<script>
import CreateBook from '@/components/CreateBook.vue';

export default {
    name: 'MyBooksView',
    components: {
        CreateBook,
    },
    data() {
        return {
            books: [],
            showDialog: false,
        };
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
