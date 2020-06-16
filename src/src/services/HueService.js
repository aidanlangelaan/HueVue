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
    let data = {}
    if (typeof on == 'boolean') {
        data.on = on
    }
    if (typeof bri == 'number') {
        data.bri = bri
    }

    return axios.put(
        `//##internalipaddress##/api/##usertoken##/lights/${id}/state`,
        data
    )
}
