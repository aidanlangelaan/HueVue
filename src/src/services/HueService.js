import axios from 'axios'

export const hueService = {
    getAllGroups,
    getAllLights
}

function getAllGroups() {
    return axios.get(`//##internalipaddress##/api/##usertoken##/groups`)
}

function getAllLights() {
    return axios.get(`//##internalipaddress##/api/##usertoken##/lights`)
}
