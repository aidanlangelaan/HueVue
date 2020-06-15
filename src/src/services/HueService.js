import axios from 'axios'

export const hueService = {
    getAllGroups,
    getAllLights,
    alterLightState
}

function getAllGroups() {
    return axios.get(`//##internalipaddress##/api/##usertoken##/groups`)
}

function getAllLights() {
    return axios.get(`//##internalipaddress##/api/##usertoken##/lights`)
}

function alterLightState(id, on, bri) {
    return axios.put(
        `//##internalipaddress##/api/##usertoken##/lights/${id}/state`,
        {
            on: on,
            bri: bri
        }
    )
}
