<template>
    <div>
        <div class="mb-4">
            <i v-if="!otherRows.length" class="text-center d-block">ПОКИ НЕМАЄ ЗАПИТІВ</i>
            <h2 v-else class="mb-6 text-center text-secondary">Твої запити</h2>
            <exchanges-list :rows="otherRows" />
        </div>
        <i v-if="!myRows.length" class="text-center d-block">
            ПОКИ НЕМАЄ ЗАПИТІВ ІНШИХ КОРИСТУВАЧІВ
        </i>
        <h2 v-else class="mb-6 text-center text-secondary">Запити інших</h2>
        <exchanges-list :rows="myRows">
            <template #actions="{ row }">
                <v-btn
                    variant="outlined"
                    color="primary"
                    class="mr-4"
                    :disabled="isLoading"
                    @click="handleCancelClick(row.id)"
                >
                    Відмовити
                </v-btn>
                <v-btn color="primary" :disabled="isLoading" @click="handleAcceptClick(row.id)">
                    Прийняти
                </v-btn>
            </template>
        </exchanges-list>
    </div>
</template>

<script>
import ExchangesList from '@/components/exchanges/ExchangesList.vue';

export default {
    name: 'CurrentPage',
    components: {
        ExchangesList,
    },
    data() {
        return {
            otherRows: [],
            myRows: [],
            isLoading: false,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const { data } = await this.axios.get('/exchange/get', {
                    params: {
                        status: 1,
                    },
                });

                this.otherRows = data.other;
                this.myRows = data.my;
            } catch (e) {
                console.error(e);
            }
        },
        async updateExchange(params) {
            this.isLoading = true;
            let group = 'success';
            let title = 'Відповідь надіслано';

            try {
                await this.axios.patch(`/exchange/${params.id}`, {
                    status: params.status,
                });

                this.getData();
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
        handleAcceptClick(id) {
            this.updateExchange({ id, status: 2 });
        },
        handleCancelClick(id) {
            this.updateExchange({ id, status: 3 });
        },
    },
};
</script>
