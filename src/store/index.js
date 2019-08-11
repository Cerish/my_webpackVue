import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    counter: 10,
    tatal: 0
};
const getters = {
    getCounter(state) {
        return state.counter;
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
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})