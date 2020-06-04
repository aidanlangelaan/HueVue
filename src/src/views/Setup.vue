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
                        ID: {{ bridge.bridgeid }}
                        <br />
                        IP address: {{ bridge.internalipaddress }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    components: {
        NavBar
    },
    data() {
        return {
            validatedBridges: [],
            detectingBridges: {
                type: Boolean,
                default: false
            }
        }
    },
    methods: {
        detectBridges() {
            if (!this.$store['hue/bridge']) {
                // no existing bridge found so detect and validate
                this.detectingBridges = true

                this.$store.dispatch('hue/detectBridges').then(foundBridges => {
                    if (foundBridges && foundBridges.length > 0) {
                        this.$store
                            .dispatch('hue/validateBridges', foundBridges)
                            .then(validatedBridges => {
                                // finished detecting and validating so now display the result
                                this.detectingBridges = false
                                this.validatedBridges = validatedBridges
                            })
                    }
                })
            } else {
                // try and connect to bridge
                this.checkConnection()
            }
        },

        checkConnection() {
            return true
        }
    },
    mounted: function() {
        this.detectBridges()
    }
}
</script>
