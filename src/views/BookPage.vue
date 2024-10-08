<template>
    <div class="book-page">
        <v-container>
            <div v-for="book in books" :key="book.id" class="book-card">
                <img :src="book.photo_link" alt="book.name" />
                <div class="book-info">
                    <h2 class="book-title">{{ book.name }}</h2>
                    <p class="book-author mb-2">
                        Власник:
                        <span class="book-year text-secondary">
                            {{ book.first_name }} {{ book.middle_name }} {{ book.last_name }}
                        </span>
                    </p>
                    <p class="book-author mb-2">
                        Адреса: <span class="book-year text-secondary">{{ book.userAddress }}</span>
                    </p>
                    <p class="book-author mb-2">
                        Phone: <span class="book-year text-secondary">{{ book.userPhone }}</span>
                    </p>
                </div>
                <div class="book-rent">
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
        margin-bottom: 10px;
    }

    .book-rent {
        position: absolute;
        bottom: 16px;
        right: 16px;
    }
}
</style>
