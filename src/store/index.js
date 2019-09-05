import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    counter: 10,
    tatal: 0,
    listData: [
        {
            similar_word: ['差不多', '相似', '类似']
        },
        {
            similar_word: ['同义词1','同义词2','同义词3',]
        }
    ],
};
const getters = {
    getCounter(state) {
        return state.counter;
    },
    getListData(state) {
        return state.listData
    }
};
const actions = {
    add: ({commit}, number = 1) => {
        console.log(number);
        return commit('add', number)
    }
};
const mutations = {
    add: (state, number = 1) => {
        state.counter += number;
        console.log(number);
        console.log(state.counter);
    },
    setListData: (state, listData) =>{
        state.listData = listData;
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})