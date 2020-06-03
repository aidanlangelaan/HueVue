import axios, { AxiosResponse } from 'axios'
import Bridge from "../../models/bridge";

// initial state
const state = () => ({
	bridges: Bridge[],
	activeBridge: {},
})

// getters
const getters = {
	getActiveBridge: state => {
		return state.activeBridge
	},

	getBridges: state => {
		return state.brdiges
	},
}

// actions
const actions = {
	detectBridges({ commit, state }) {
		axios
			.get('https://discovery.meethue.com/')
			.then(response => {
				if (response.status === 200 && response.data.length > 0) {
					//commit('setBridges', response.data)

					return response.data
				}
			})
			.then(bridges => {})
			.catch(error => {
				// failed to validate bridge so ignoring it
				console.log(error)
			})
	},

	changeActiveBridge({ commit, state }, bridge) {
		commit('setActiveBridge', bridge)
	},
}

// mutations
const mutations = {
	setActiveBridge(state, bridge) {
		state.activeBridge = bridge
	},

	setBridges(state, bridges) {
		state.bridges = bridges
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
