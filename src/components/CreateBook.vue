<template>
    <v-dialog :model-value="modelValue" max-width="450">
        <v-card>
            <v-card-title class="text-center">ADD NEW BOOK</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-autocomplete
                        v-model="newBook.book_id"
                        :items="booksItems"
                        density="compact"
                        label="Book"
                        :rules="[rules.required]"
                        variant="outlined"
                        class="mb-2"
                    />
                    <v-file-input
                        v-model="newBook.file"
                        density="compact"
                        label="Upload book photo"
                        variant="outlined"
                        prepend-icon=""
                        :clearable="false"
                        :rules="[rules.requiredFile]"
                        append-inner-icon="mdi-camera"
                        @update:model-value="handleImageUpload"
                    />
                </v-form>
            </v-card-text>
            <v-card-actions class="px-6 pb-4">
                <v-btn
                    color="primary"
                    variant="outlined"
                    class="mr-2 px-4"
                    @click="handleCancelClick"
                >
                    Cancel
                </v-btn>
                <v-btn color="primary" variant="elevated" class="px-4" @click="createBook">
                    Create
                </v-btn>
            </v-card-actions>
            <cropper-component
                v-model="showCropper"
                :file="newBook.file"
                @update="handleImageUpdate"
            />
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import CropperComponent from '@/components/CropperComponent.vue';

export default {
    name: 'CreateBook',
    components: {
        CropperComponent,
    },
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update', 'update:modelValue'],
    data() {
        return {
            rules: {
                required: (s) => !!s || "Поле обов'язкове",
                requiredFile: (f) => {
                    return (!!f.length && f[0].size > 0) || "Поле обов'язкове";
                },
            },
            newBook: {
                book_id: null,
                file: null,
            },
            showCropper: false,
        };
    },
    computed: {
        ...mapGetters('common', ['booksItems']),
    },
    methods: {
        async createBook() {
            const valid = await this.$refs.form.validate();

            if (!valid) {
                return;
            }

            try {
                const formData = new FormData();

                Object.entries(this.newBook).forEach(([field, value]) => {
                    formData.append(field, value);
                });

                await this.axios.post('/instance/my', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                this.$emit('update:modelValue', false);
                this.$emit('update');
                this.newBook = {};
            } catch (e) {
                console.error(e);
            }
        },
        handleImageUpload() {
            this.showCropper = true;
        },
        handleImageUpdate(file) {
            this.showCropper = false;
            this.newBook.file = file;
        },
        async handleCancelClick() {
            this.$emit('update:modelValue', false);
            this.newBook = {};
        },
    },
};
</script>
