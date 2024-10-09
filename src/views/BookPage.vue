<template>
    <div class="book-page">
        <v-container>
            <div v-for="book in books" :key="book.id" class="card">
                <img :src="book.photo_link" alt="book.name" class="mr-4" />
                <div>
                    <p>{{ book.name }}</p>
                    <p class="mb-2">
                        Власник:
                        <span class="text-secondary">
                            {{ book.first_name }} {{ book.middle_name }} {{ book.last_name }}
                        </span>
                    </p>
                    <p class="mb-2">
                        Адреса: <span class="text-secondary">{{ book.userAddress }}</span>
                    </p>
                    <p>
                        Phone: <span class="text-secondary">{{ book.userPhone }}</span>
                    </p>
                </div>
                <div class="card__right-down-slot">
                    <v-btn
                        v-if="book.exchange_status === 1"
                        variant="outlined"
                        color="orange"
                        readonly
                    >
                        Очікує підтвердження
                    </v-btn>
                    <v-btn
                        v-else
                        variant="outlined"
                        color="primary"
                        :disabled="isLoading"
                        @click="handleRentClick(book.id)"
                    >
                        Позичити
                    </v-btn>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'BookPage',
    data() {
        return {
            books: [],
            isLoading: false,
        };
    },
    created() {
        this.getBookInfo();
    },
    methods: {
        async getBookInfo() {
            try {
                const { data } = await this.axios.get(
                    `/instance/exchange/${this.$route.params.id}`,
                );

                this.books = data;
            } catch (e) {
                console.error(e);
            }
        },
        async handleRentClick(book) {
            this.isLoading = true;
            let group = 'success';
            let title = 'Запит відправлений власнику книги!';

            try {
                await this.axios.post(`/exchange/create/`, {
                    book,
                });

                this.getBookInfo();
            } catch (e) {
                console.error(e);

                group = 'error';
                title = 'Не вдалося відправити запит';
            } finally {
                this.isLoading = false;

                this.$notify({
                    group,
                    title,
                });
            }
        },
    },
};
</script>
