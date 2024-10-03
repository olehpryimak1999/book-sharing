import axios from 'axios';
import { updateValue } from '@/helpers';

const state = {
    books: [],
};

const getters = {
    booksItems: (s) =>
        s.books.map((book) => ({
            value: book.id,
            title: `${book.name} - ${book.author} (${book.year})`,
        })),
};

const actions = {
    async getAllBooks({ commit }) {
        try {
            const { data } = await axios.get('/books', { params: { search: '' } });

            commit('updateValue', { key: 'books', value: data });
        } catch (e) {
            console.error(e);
        }
    },
};

const mutations = {
    updateValue,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
