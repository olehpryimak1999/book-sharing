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
            @click:append-inner="handleNameAppendInnerClick"
        />
        <v-file-input
            :model-value="photo"
            variant="solo"
            label="Update photo"
            max-width="500"
            prepend-icon=""
            bg-color="white"
            class="mb-3"
            :clearable="false"
            append-inner-icon="mdi-camera"
            @update:model-value="handlePhotoUpdate"
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
            @click:append-inner="handlePhoneAppendInnerClick"
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
        <name-changer v-model="showNameChanger" />
        <phone-selector v-model="showPhoneChanger" />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PostSelector from '@/components/PostSelector.vue';
import NameChanger from '@/components/NameChanger.vue';
import PhoneSelector from '@/components/PhoneSelector.vue';

export default {
    components: {
        PhoneSelector,
        NameChanger,
        PostSelector,
    },
    data() {
        return {
            showNameChanger: false,
            showPhoneChanger: false,
            showPostSelector: false,
            photo: null,
        };
    },
    computed: {
        ...mapGetters('auth', ['userData']),
    },
    methods: {
        ...mapActions('auth', ['checkAuth']),
        handleAppendInnerClick() {
            this.showPostSelector = true;
        },
        handleNameAppendInnerClick() {
            this.showNameChanger = true;
        },
        handlePhoneAppendInnerClick() {
            this.showPhoneChanger = true;
        },
        async handlePhotoUpdate(file) {
            this.photo = null;

            try {
                const formData = new FormData();

                formData.append('file', file);

                await this.axios.post('/user/info/photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.checkAuth();
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>
