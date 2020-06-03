// initial state
const state = () => ({
    sideBarOpen: false
})

// getters
const getters = {
    sideBarOpen: state => {
        return state.sideBarOpen
    }
}

// actions
const actions = {
    changeSideBarState({ commit }, position) {
        commit('setSideBarState', position)
    }
}

// mutations
const mutations = {
    setSideBarState(state, position) {
        state.sideBarOpen = position
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
