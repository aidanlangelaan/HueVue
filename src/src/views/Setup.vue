<template>
    <div class="page-body">
        <nav-bar page-title="Setup" class="page-header" />
        <div class="page-content">
            <b-card title="Welcome to HueVue" class="text-center">
                <b-card-text>
                    <div id="setup-intro">
                        Get started by powering your Hue Bridge and hooking it up to your WiFi router.
                        If your device is on the same WiFi network we will automatically detect it.
                    </div>

                    <img src="@/assets/images/hue_bridge.png" alt="Philips Hue Bridge" />

                    <div class="detection-status">
                        <div
                            id="searching"
                            v-if="(detectingBridges = true && validatedBridges.length == 0)"
                        >
                            <b-spinner class="spinner" small variant="info" label="Searching..."></b-spinner>
                            <span class="status-content">Searching for Hue Bridges...</span>
                        </div>

                        <div
                            id="not-found"
                            v-if="(detectingBridges = false && validatedBridges.length == 0)"
                        >
                            <b-icon icon="exclamation"></b-icon>
                            <span class="status-content">No Hue Bridge found</span>
                        </div>

                        <div id="found-bridges" v-if="validatedBridges.length > 0">
                            <b-icon icon="check-circle-fill"></b-icon>
                            <span class="status-content">
                                {{ validatedBridges.length }}
                                <span
                                    v-if="validatedBridges.length == 1"
                                >bridge</span>
                                <span v-if="validatedBridges.length > 1">bridges</span>
                                found
                            </span>
                        </div>
                    </div>

                    <!-- TODO: multiple bridges found -->
                    <div id="bridge-selection" v-if="validatedBridges.length > 1">
                        <p>Select which Hue Bridge you want to use:</p>

                        <b-form-group>
                            <b-form-radio
                                v-for="bridge in validatedBridges"
                                :key="bridge.bridgeid"
                                v-model="selectedBridge"
                                button-variant="info"
                                name="some-radios"
                                @change="bridgeSelected"
                                :value="bridge.bridgeid"
                            >{{ bridge.internalipaddress }} - {{ bridge.mac }}</b-form-radio>
                        </b-form-group>
                    </div>

                    <div id="actions">
                        <b-button
                            variant="info"
                            v-if="validatedBridges.length == 0"
                            :disabled="detectingBridges = true"
                            @click="detectBridges"
                        >Search</b-button>

                        <b-button
                            variant="info"
                            v-if="validatedBridges.length > 0"
                            :disabled="validatedBridges.length > 1 && selectedBridge.length == 0"
                            @click="setupBridge"
                        >Setup</b-button>
                    </div>
                </b-card-text>
            </b-card>
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
            detectingBridges: Boolean,
            selectedBridge: '',
            activeBridge: {}
        }
    },
    methods: {
        detectBridges() {
            // detect and validate any found bridges
            this.$store.dispatch('hue/detectBridges').then(foundBridges => {
                if (foundBridges && foundBridges.length > 0) {
                    this.$store
                        .dispatch('hue/validateBridges', foundBridges)
                        .then(validatedBridges => {
                            // finished detecting and validating so now display the result
                            this.validatedBridges = validatedBridges
                            this.detectingBridges = false
                        })
                }
            })
        },

        bridgeSelected(selected) {
            let selectedBridge = this.validatedBridges.find(function(bridge) {
                return bridge.bridgeid === selected
            })

            if (selectedBridge) {
                this.activeBridge = selectedBridge
            }
        },

        setupBridge() {
            // save active bridge to store and continue
            if (this.validatedBridges.length > 1) {
                this.$store.commit('hue/setActiveBridge', this.activeBridge)
            } else {
                this.$store.commit(
                    'hue/setActiveBridge',
                    this.validatedBridges[0]
                )
            }

            console.log('TODO: continue to next step')
        }
    },
    mounted: function() {
        this.detectingBridges = true

        this.detectBridges()
    }
}
</script>

<style lang="scss" scoped>
.card {
    #setup-intro {
        margin-bottom: 20px;
    }

    img {
        max-width: 200px;
        width: 100%;
        margin-bottom: 10px;
    }

    .detection-status {
        margin-bottom: 25px;

        .status-content {
            top: 2px;
            position: relative;
        }

        #searching {
            .spinner {
                margin-right: 15px;
            }
        }

        #not-found {
            .b-icon {
                font-size: 30px;
                fill: red;
                position: relative;
                top: 5px;
            }

            .status-content {
                top: 0;
            }
        }

        #found-bridges {
            .b-icon {
                margin-right: 5px;
                position: relative;
                top: 3px;
                fill: green;
                font-size: 20px;
            }
        }
    }

    #bridge-selection {
        margin-bottom: 25px;

        p {
            margin-bottom: 5px;
        }
    }

    #actions {
        button {
            background-color: #3eaf7c;
            border-color: #3eaf7c;
        }
    }
}
</style>