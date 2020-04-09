import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// tslint:disable-next-line:typedef
export default new Vuex.Store({
    state: {
        sideBarOpen: false,
    },
    mutations: {
        // tslint:disable-next-line:typedef
        changeSideBarState(state, position) {
            state.sideBarOpen = position;
        },
	},
	getters: {
		sideBarOpen: state => state.sideBarOpen
	},
    actions: {},
    modules: {},
})
