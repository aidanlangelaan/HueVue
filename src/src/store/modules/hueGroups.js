import { hueService } from '@/services/HueService'

// initial state
const state = () => ({
    groups: []
})

// getters
const getters = {
    getGroups: state => {
        return state.groups
    },

    getGroup: state => id => {
        const index = state.groups.findIndex(g => g.group_id === id)
        return state.groups[index]
    },

    getRooms: state => {
        const rooms = []
        state.groups.reduce((accumulator, currentValue) => {
            if (currentValue.type.toLowerCase() == 'room') {
                rooms.push(currentValue)
            }

            return currentValue
        }, {})

        return rooms
    },

    getZones: state => {
        const zones = []
        state.groups.reduce((accumulator, currentValue) => {
            if (currentValue.type.toLowerCase() == 'zone') {
                zones.push(currentValue)
            }

            return currentValue
        }, {})

        return zones
    }
}

// actions
const actions = {
    fetchAllGroups({ commit }) {
        hueService
            .getAllGroups()
            .then(response => {
                if (response.status == 200) {
                    const groups = []
                    Object.keys(response.data).forEach(d => {
                        let group = response.data[d]
                        group.group_id = parseInt(d, 10)
                        groups.push(group)
                    })

                    commit('setGroups', groups)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// mutations
const mutations = {
    setGroups(state, groups) {
        state.groups = groups
    },

    setGroup(state, group) {
        const index = state.groups.findIndex(g => g.group_id === group.group_id)
        state.groups[index] = group
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
