import axios from 'axios';
import Cookies from 'js-cookie';
import { updateValue } from '@/helpers';

const state = {
    token: Cookies.get('auth_token'),
    userData: {},
    isAuthenticated: false,
};

const getters = {
    token: (s) => s.token,
    userData: (s) => s.userData,
    isAuthenticated: (s) => s.isAuthenticated,
};

const actions = {
    async checkAuth({ commit }) {
        try {
            const { data } = await axios.get('user_info/');

            if (data?.ok) {
                commit('updateValue', { key: 'isAuthenticated', value: true });
                commit('updateValue', { key: 'userData', value: data });
            }
        } catch (e) {
            throw e;
        }
    },
    logout({ commit }) {
        commit('updateValue', { key: 'isAuthenticated', value: false });
        commit('updateValue', { key: 'userData', value: {} });
        commit('updateValue', { key: 'token', value: '' });
        Cookies.remove('auth_token');
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
