<template>
    <v-container>
        <div class="profile-card pa-6">
            <v-text-field
                readonly
                variant="plain"
                label="User name"
                class="mb-3"
                bg-color="white"
                append-inner-icon="mdi-pencil"
                :model-value="
                    [userData.first_name, userData.middle_name, userData.last_name].join(' ')
                "
                @click:append-inner="handleNameAppendInnerClick"
            />
            <v-file-input
                :model-value="photo"
                variant="plain"
                label="Update photo"
                prepend-icon=""
                bg-color="white"
                class="mb-3"
                :clearable="false"
                append-inner-icon="mdi-camera"
                @update:model-value="handlePhotoUpdate"
            />
            <v-text-field
                readonly
                variant="plain"
                label="Phone number"
                class="mb-3"
                bg-color="white"
                append-inner-icon="mdi-pencil"
                :model-value="userData.phone || '--'"
                @click:append-inner="handlePhoneAppendInnerClick"
            />
            <v-text-field
                readonly
                variant="plain"
                bg-color="white"
                label="Your address"
                append-inner-icon="mdi-pencil"
                :model-value="userData.address || '--'"
                @click:append-inner="handleAppendInnerClick"
            />
            <v-divider></v-divider>
            <v-btn variant="text" class="mt-4" @click="logoutHandler"> Вийти </v-btn>
        </div>
        <post-selector v-model="showPostSelector" />
        <name-changer v-model="showNameChanger" />
        <phone-selector v-model="showPhoneChanger" />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PostSelector from '@/components/PostSelector.vue';
import NameChanger from '@/components/NameChanger.vue';
import PhoneSelector from '@/components/PhoneSelector.vue';
import { ROUTE_NAME_WELCOME } from '@/constants';

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
        ...mapActions('auth', ['checkAuth', 'logout']),
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
        logoutHandler() {
            this.logout();
            this.$router.push({ name: ROUTE_NAME_WELCOME });
        },
    },
};
</script>

<style lang="scss" scoped>
.profile-card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
