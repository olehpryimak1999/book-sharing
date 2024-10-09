<template>
    <div class="mb-4">
        <h2 v-if="otherRows.length" class="mb-6 text-center text-secondary">Твої запити</h2>
        <exchanges-list :rows="otherRows" />
    </div>
    <h2 v-if="myRows.length" class="mb-6 text-center text-secondary">Книги іншим</h2>
    <exchanges-list :rows="myRows" />
</template>

<script>
import ExchangesList from '@/components/exchanges/ExchangesList.vue';

export default {
    name: 'HistoryPage',
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
                        status: 3,
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

<style scoped></style>
