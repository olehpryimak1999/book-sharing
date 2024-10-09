<template>
    <v-dialog :model-value="modelValue" max-width="600" persistent>
        <v-card>
            <v-card-title class="text-center">Обрізати зображення</v-card-title>
            <v-card-text>
                <cropper
                    :src="imageUrl"
                    class="cropper"
                    :resize-image="false"
                    :stencil-props="{ aspectRatio: ratio }"
                    @change="handleCropChange"
                />
            </v-card-text>
            <v-card-actions class="align-end px-6 pb-4">
                <v-btn variant="elevated" color="primary" @click="handleSaveClick">
                    Обрізати
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
    name: 'CropperComponent',
    components: {
        Cropper,
    },
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        ratio: {
            type: Number,
            default: 3 / 4,
        },
        file: {
            type: Object,
            default: () => {},
        },
    },
    emits: ['update'],
    data() {
        return {
            cropData: null,
        };
    },
    computed: {
        imageUrl() {
            return URL.createObjectURL(this.file || null);
        },
    },
    methods: {
        handleCropChange({ coordinates }) {
            this.cropData = coordinates;
        },
        handleSaveClick() {
            if (!this.cropData) {
                return;
            }

            const img = new Image();
            img.src = this.imageUrl;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = this.cropData.width;
                canvas.height = this.cropData.height;

                ctx.drawImage(
                    img,
                    this.cropData.left,
                    this.cropData.top,
                    this.cropData.width,
                    this.cropData.height,
                    0,
                    0,
                    this.cropData.width,
                    this.cropData.height,
                );

                canvas.toBlob((blob) => {
                    blob.name = this.file.name;
                    this.$emit('update', blob);
                }, 'image/jpeg');
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.cropper {
    max-height: 500px;
}
</style>
