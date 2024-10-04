<template>
    <v-dialog
        :model-value="modelValue"
        max-width="600"
        @update:model-value="$emit('update:modelValue', $event)"
    >
        <v-card>
            <v-card-title class="text-center"> Обери своє відділення Нової Пошти </v-card-title>
            <v-card-text>
                <div class="d-flex flex-column justify-center align-center">
                    <v-autocomplete
                        v-model="city"
                        :items="cities"
                        :loading="isSearching"
                        label="Місто"
                        variant="underlined"
                        no-data-text="Починай ввводити своє місто"
                        width="450"
                        @update:search="handleCitySearchUpdate"
                    >
                        <template #item="{ item, props }">
                            <v-list-item
                                v-bind="props"
                                :title="item.title"
                                :value="item.value"
                                :subtitle="item.raw.subtitle"
                            />
                        </template>
                        <template #selection="{ item }">
                            {{ item.title }}, {{ item.raw.subtitle }}
                        </template>
                    </v-autocomplete>
                    <v-autocomplete
                        v-model="address"
                        :items="addresses"
                        :loading="isSearching"
                        :disabled="!city"
                        label="Відділення НП"
                        variant="underlined"
                        width="450"
                        return-object
                        no-data-text="Починай ввводити свою пошту"
                        @update:search="handleSearchUpdate"
                    >
                        <template #item="{ item, props }">
                            <v-list-item
                                v-bind="props"
                                :title="item.title"
                                :value="item.value"
                                :subtitle="item.raw.subtitle"
                            />
                        </template>
                        <template #selection="{ item }">
                            {{ item.title }}, {{ item.raw.subtitle }}
                        </template>
                    </v-autocomplete>
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
import { mapActions } from 'vuex';
import { debounce } from 'lodash';
import { HEADER_WITHOUT_AUTH } from '@/constants';

export default {
    name: 'PostSelector',
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            city: null,
            address: null,
            cities: [],
            addresses: [],
            isSearching: false,
        };
    },
    watch: {
        city() {
            this.address = null;
        },
    },
    methods: {
        ...mapActions('profile', ['updateAccount']),
        ...mapActions('auth', ['checkAuth']),
        async getPosts(search) {
            try {
                const { data } = await this.axios.post(
                    'https://api.novaposhta.ua/v2.0/json/',
                    {
                        apiKey: import.meta.env.VITE_API_NOVA_POST_API_KEY,
                        modelName: 'AddressGeneral',
                        calledMethod: 'getWarehouses',
                        methodProperties: {
                            FindByString: search,
                            CityRef: this.city,
                            Page: '1',
                            Limit: '5000',
                            Language: 'UA',
                        },
                    },
                    {
                        headers: {
                            [HEADER_WITHOUT_AUTH]: true,
                        },
                    },
                );

                this.addresses = data.data.map((row) => ({
                    value: row.Ref,
                    title: `Відділення ${row.Number} - ${row.SettlementTypeDescription} ${row.CityDescription}`,
                    subtitle: `${row.SettlementAreaDescription} область`,
                }));
            } catch (e) {
                console.error(e);
            }
        },
        async getCities(search) {
            try {
                const { data } = await this.axios.post(
                    'https://api.novaposhta.ua/v2.0/json/',
                    {
                        apiKey: import.meta.env.VITE_API_NOVA_POST_API_KEY,
                        modelName: 'AddressGeneral',
                        calledMethod: 'getCities',
                        methodProperties: {
                            FindByString: search,
                            Page: '1',
                            Limit: '5000',
                            Language: 'UA',
                        },
                    },
                    {
                        headers: {
                            [HEADER_WITHOUT_AUTH]: true,
                        },
                    },
                );

                this.cities = data.data.map((row) => ({
                    value: row.Ref,
                    title: `${row.SettlementTypeDescription} ${row.Description}`,
                    subtitle: `${row.AreaDescription} область`,
                }));
            } catch (e) {
                console.error(e);
            }
        },
        handleSearchUpdate: debounce(async function (input) {
            if (input.length < 1 || this.address) {
                return;
            }
            this.isSearching = true;
            await this.getPosts(input);
            this.isSearching = false;
        }, 200),
        handleCitySearchUpdate: debounce(async function (input) {
            if (input.length < 3 || this.city) {
                return;
            }

            this.isSearching = true;
            await this.getCities(input);
            this.isSearching = false;
        }, 200),
        async handleSaveClick() {
            if (!this.address) {
                return;
            }

            await this.updateAccount({
                address: [this.address.title, this.address.subtitle].join(', '),
            });
            await this.checkAuth();

            this.$emit('update:modelValue', false);
        },
    },
};
</script>

<style scoped></style>
