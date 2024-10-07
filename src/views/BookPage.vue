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
                <v-btn
                    variant="outlined"
                    class="book-rent"
                    color="primary"
                    @click="handleRentClick(book.id)"
                >
                    Позичити
                </v-btn>
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
            try {
                const { data } = await this.axios.post(`/exchange/create/`, {
                    book,
                });

                console.log(data);
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
