<template>
    <div class="profile page-container pt-16">
        <v-text-field
            readonly
            variant="solo"
            label="User name"
            class="mb-3"
            bg-color="white"
            append-inner-icon="mdi-pencil"
            max-width="500"
            :model-value="[userData.first_name, userData.middle_name, userData.last_name].join(' ')"
        />
        <v-text-field
            readonly
            variant="solo"
            label="Phone number"
            class="mb-3"
            bg-color="white"
            append-inner-icon="mdi-pencil"
            max-width="500"
            :model-value="userData.phone || '--'"
        />
        <v-text-field
            readonly
            variant="solo"
            bg-color="white"
            label="Your address"
            append-inner-icon="mdi-pencil"
            max-width="500"
            :model-value="userData.address || '--'"
            @click:append-inner="handleAppendInnerClick"
        />
        <post-selector v-model="showPostSelector" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostSelector from '@/components/PostSelector.vue';

export default {
    components: {
        PostSelector,
    },
    data() {
        return {
            showPostSelector: false,
        };
    },
    computed: {
        ...mapGetters('auth', ['userData']),
    },
    methods: {
        handleAppendInnerClick() {
            this.showPostSelector = true;
        },
    },
};
</script>
