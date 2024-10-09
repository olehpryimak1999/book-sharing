<template>
    <v-btn readonly variant="outlined" :color="STATUS_MAP[status].color">
        {{ STATUS_MAP[status].label }}
    </v-btn>
</template>

<script>
const STATUS_MAP = {
    1: { label: 'Очікуємо', color: 'orange' },
    2: { label: 'Активний', color: 'green' },
    3: { label: 'Відмовлено', color: 'red' },
    4: { label: 'Завершено', color: 'grey' },
};
export default {
    name: 'StatusWidget',
    props: {
        status: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            STATUS_MAP,
        };
    },
};
</script>

<style scoped></style>
