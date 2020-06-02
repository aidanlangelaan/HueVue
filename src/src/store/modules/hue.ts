// initial state
const state = () => ({
	bridge: {},
})

// getters
const getters = {
	activeBrdige: state => {
		return state.bridge
	},
}

// actions
const actions = {
	changeActiveBridge({ commit, state }, bridge) {
		commit('setActiveBridge', bridge)
	},
}

// mutations
const mutations = {
	setActiveBridge(state, bridge) {
		state.bridge = bridge
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
