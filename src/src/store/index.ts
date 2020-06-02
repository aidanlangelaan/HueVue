import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sideBarOpen: false,
	},
	mutations: {
		changeSideBarState(state, position) {
			state.sideBarOpen = position
		},
	},
	getters: {
		sideBarOpen: state => state.sideBarOpen,
	},
	actions: {},
	modules: {},
})
