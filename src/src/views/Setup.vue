<template>
    <div class="page-body">
        <nav-bar page-title="Setup" class="page-header" />
        <div class="page-content">
            <div
                v-if="(detectingBridges = true && validatedBridges.length == 0)"
            >Searching for Hue Bridges...</div>

            <div
                v-if="
					(detectingBridges = false && validatedBridges.length == 0)
				"
            >No Hue Bridges found.</div>

            <div v-if="validatedBridges.length > 0">
                <span v-if="validatedBridges.length == 1">The following bridge was found:</span>
                <span v-if="validatedBridges.length > 1">The following bridges were found:</span>

                <ul>
                    <li v-for="bridge in validatedBridges" :key="bridge.id">
                        ID: {{ bridge.id }}
                        <br />
                        IP address: {{ bridge.internalipaddress }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import NavBar from '@/components/NavBar'

export default {
    components: {
        NavBar
    },
    data() {
        return {
            rawBridges: [],
            validatedBridges: [],
            detectingBridges: {
                type: Boolean,
                default: false
            }
        }
    },
    methods: {
        checkBridge() {
            if (!this.$store['hue/bridge']) {
                // no existing bridge found so try and detect
                this.detectingBridges = true
                axios
                    .get('https://discovery.meethue.com/')
                    .then(this.setupBridge)
            } else {
                // try and connect to bridge
                this.checkConnection()
            }
        },

        checkConnection() {
            return true
        },

        setupBridge(response) {
            if (response.data) {
                this.rawBridges = response.data
                this.rawBridges.forEach(this.validateBridge)
            } else {
                // no bridges found!
                this.detectingBridges = false
            }
        },

        validateBridge(bridge) {
            // try fetching the description
            axios
                .get(`http://${bridge.internalipaddress}/api/tmp/config`)
                .then(response => {
                    if (response.status == 200 && response.data) {
                        // const validatedBridge = that.rawBridges.find(
                        // 	element => element.id == response.bridgeid.toLowerCase()
                        // )
                        // if (validatedBridge) {
                        // 	that.validatedBridges.push(validatedBridge)
                        // }
                    }
                })
                .catch(error => {
                    // failed to validate bridge so ignoring it
                    console.log(error)
                })
        }
    },
    mounted: function() {
        this.checkBridge()
    }
}
</script>