<template>
    <b-card no-body header="Your lights">
        <b-list-group flush>
            <b-list-group-item
                v-for="light in lights"
                :key="light.light_id"
                class="group-item"
                :style="{ backgroundColor: getBackgroundColor(light) }"
            >
                <div class="top">
                    <div class="group-icon">
                        <img
                            :src="getLightIconClass(light.config.archetype)"
                            :style="{
                                filter:
                                    getForgroundColor(light) == 'white'
                                        ? 'invert(1)'
                                        : 'none'
                            }"
                        />
                    </div>
                    <div class="group-description">
                        <div
                            class="name"
                            :style="{ color: getForgroundColor(light) }"
                        >
                            {{ light.name }}
                        </div>
                        <div
                            class="state-description"
                            v-if="!light.state.reachable"
                            :style="{ color: getForgroundColor(light) }"
                        >
                            Unreachable
                        </div>
                    </div>
                    <div class="group-action">
                        <b-form-group>
                            <b-form-checkbox
                                v-model="light.state.on"
                                switch
                                size="lg"
                                @change="toggleOnState(light)"
                            />
                        </b-form-group>
                    </div>
                </div>
                <div class="bottom" v-if="light.state.on">
                    <vue-slider
                        v-model="light.state.bri"
                        :tooltip="'none'"
                        :min="1"
                        :max="254"
                        :interval="1"
                        @change="changeLightState(light)"
                    ></vue-slider>
                </div>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
import colorConverter from '@/helpers/hueColorConverter'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'LightList',
    components: {
        VueSlider
    },
    data() {
        return {}
    },
    computed: {
        lights: {
            get() {
                return this.$store.getters['hueLights/getLights']
            },
            set(lights) {
                this.$store.commit('hueLights/setLights', lights)
            }
        }
    },
    methods: {
        getLightIconClass(archetype) {
            return require(`../assets/hue-icons/light_${archetype.toLowerCase()}.png`)
        },

        getBackgroundColor(light) {
            if (light.state.on) {
                let rgb = colorConverter.calculateRGB(
                    light.state.xy,
                    light.state.bri,
                    light.modelid
                )

                let hex = colorConverter.RGBToHEX(rgb.r, rgb.g, rgb.b)
                return hex
            } else {
                return '#484848'
            }
        },

        getForgroundColor(light) {
            if (light.state.on) {
                let rgb = colorConverter.calculateRGB(
                    light.state.xy,
                    light.state.bri,
                    light.modelid
                )

                if (rgb.b > 225) {
                    return 'white'
                } else {
                    return 'black'
                }
            } else {
                return 'white'
            }
        },

        toggleOnState(light) {
            // flip value as we now get the old value instead of the new
            light.state.on = !light.state.on

            this.changeLightState(light)
        },

        changeLightState(light) {
            this.$store
                .dispatch('hueLights/setLightState', light)
                .then(result => {
                    if (result) {
                        console.log('state updated')
                    }
                })
        },

        addNewLight() {
            this.$router.push({ name: 'lights.add' })
        },

        flashLight(light) {
            console.log(light)
        },

        viewLight(light) {
            this.$router.push({
                name: 'lights.view',
                params: { id: light.name }
            })
        }
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
.card {
    background: none;
    border: none;
    margin-bottom: 0 !important;

    .card-header {
        background: none;
        border: none;
        color: #333;
        font-size: 16px;
        padding-bottom: 5px;
        padding-top: 0;
    }

    .list-group {
        border-radius: calc(0.25rem - 1px);
    }

    .group-item {
        border-radius: calc(0.25rem - 1px);
        margin-bottom: 10px;
        padding-bottom: 0;
        padding-top: 0;

        &:last-child {
            margin-bottom: 0;
            border-width: 0 0 1px;
        }

        .top {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            height: 70px;

            .group-icon {
                flex: 0 0 3rem;
                display: flex;
                align-items: center;
                filter: invert(1);

                img {
                    height: 30px;
                }
            }

            .group-description {
                display: flex;
                justify-content: center;
                flex-direction: column;
                flex: auto;

                .name {
                    font-weight: bold;
                    font-size: 17px;
                }

                .state-description {
                    font-size: 13px;
                    color: orange;
                }
            }

            .group-action {
                flex: 0 0 3rem;
                align-items: center;
                display: flex;
                justify-content: flex-end;
                font-size: 22px;

                .form-group {
                    margin: 0;
                    .custom-control.custom-switch {
                        /deep/ .custom-control-label::before {
                            border: none;
                            background-color: rgba(0, 0, 0, 0.3);
                        }

                        /deep/ .custom-control-label::after {
                            background-color: #fff;
                        }
                    }
                }
            }
        }

        .bottom {
            height: 30px;

            .vue-slider {
                height: 15px !important;

                /deep/ .vue-slider-rail {
                    background: rgba(255, 255, 255, 0.4);

                    .vue-slider-process {
                        background: linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0.1) 0%,
                            rgba(255, 255, 255, 1) 100%
                        );
                    }

                    .vue-slider-dot {
                        width: 20px !important;
                        height: 20px !important;
                    }
                }
            }
        }
    }

    .card-footer {
        background: none;
        border: none;
        padding-top: 15px;
    }
}
</style>
