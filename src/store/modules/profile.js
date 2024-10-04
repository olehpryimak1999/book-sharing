import axios from 'axios';

const actions = {
    async updateAccount({}, params) {
        try {
            await axios.patch('/user/info', params);
        } catch (e) {
            console.error(e);
        }
    },
};

export default {
    namespaced: true,
    actions,
};
