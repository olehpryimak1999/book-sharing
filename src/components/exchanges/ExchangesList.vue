<template>
    <div v-for="row in rows" :key="row.id" class="card">
        <img :src="row.photo_link" alt="book.name" class="mr-4" />
        <div>
            <p class="mb-2">{{ row.name }}</p>
            <p class="mb-2">
                <user-card
                    :user-data="{
                        first_name: row.first_name,
                        last_name: row.last_name,
                        middle_name: row.middle_name,
                        picture: row.picture,
                        phone: row.phone,
                        address: row.address,
                    }"
                />
            </p>
        </div>
        <div class="card__right-up-slot card__right-up-slot_mandatory">
            <status :status="row.exchange_status" />
        </div>
        <div class="card__right-down-slot">
            <slot name="actions" :row="row"></slot>
        </div>
    </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import Status from '@/components/exchanges/Status.vue';

export default {
    name: 'ExchangesList',
    components: {
        UserCard,
        Status,
    },
    props: {
        rows: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped></style>
