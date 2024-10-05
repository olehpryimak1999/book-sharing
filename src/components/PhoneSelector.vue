<template>
    <v-dialog
        :model-value="modelValue"
        max-width="600"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <v-card>
            <v-card-title class="text-center">
                Зміни свій номер телефону для Нової Пошти
            </v-card-title>
            <v-card-text>
                <div class="d-flex flex-column justify-center align-center">
                    <v-text-field
                        v-model="userDataCopy.phone"
                        label="Phone"
                        width="450"
                        variant="underlined"
                    />
                </div>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn
                    variant="outlined"
                    color="primary"
                    class="mr-4"
                    @click="$emit('update:modelValue', false)"
                >
                    Cancel
                </v-btn>
                <v-btn variant="elevated" color="primary" @click="handleSaveClick">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { cloneDeep } from 'lodash';

export default {
    name: 'PhoneSelector',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            userDataCopy: cloneDeep(this.userData),
        };
    },
    computed: {
        ...mapGetters('auth', ['userData']),
    },
    watch: {
        modelValue() {
            this.userDataCopy = cloneDeep(this.userData);
        },
    },
    methods: {
        ...mapActions('profile', ['updateAccount']),
        ...mapActions('auth', ['checkAuth']),
        async handleSaveClick() {
            await this.updateAccount({
                phone: this.userDataCopy.phone,
            });
            await this.checkAuth();

            this.$emit('update:modelValue', false);
        },
    },
};
</script>

<style lang="scss" scoped>
.phone-selector {
    width: 450px;
    height: 40px;

    :deep(.vti__dropdown) {
        display: none;
    }
}
</style>
