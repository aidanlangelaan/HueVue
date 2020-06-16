<template>
    <b-list-group flush>
        <b-list-group-item
            v-for="group in groups"
            :key="group.group_id"
            class="group-item"
            :style="{ background: getBackgroundColor(group) }"
        >
            <div class="top">
                <div class="group-info" @click="groupClicked(group)">
                    <div class="group-icon">
                        <img
                            :src="getAreaIconClass(group.class)"
                            :style="{
                            filter:
                                getForgroundColor(group) == 'white'
                                    ? 'invert(1)'
                                    : 'none'
                        }"
                        />
                    </div>
                    <div class="group-description">
                        <div
                            class="name"
                            :style="{ color: getForgroundColor(group) }"
                        >{{ group.name }}</div>
                        <div class="light-count" :style="{ color: getForgroundColor(group) }">
                            <span v-if="group.state.all_on">All lights are on</span>

                            <span
                                v-if="!group.state.all_on && group.state.any_on && getActiveLightCount(group) > 1"
                            >{{ getActiveLightCount(group) }} lights are on</span>

                            <span
                                v-if="!group.state.all_on && group.state.any_on && getActiveLightCount(group) == 1"
                            >{{ getActiveLightCount(group) }} light is on</span>

                            <span v-if="!group.state.any_on">All lights are off</span>
                        </div>
                    </div>
                </div>
                <div class="group-action">
                    <b-form-group>
                        <b-form-checkbox
                            v-model="group.state.any_on"
                            switch
                            size="lg"
                            @input="toggleOnState(group)"
                        />
                    </b-form-group>
                </div>
            </div>
            <div class="bottom" v-if="group.state.any_on">
                <vue-slider
                    :value="getBrightness(group)"
                    v-model="group.state.bri"
                    :tooltip="'none'"
                    :silent="true"
                    :contained="true"
                    :clickable="false"
                    :min="1"
                    :max="254"
                    :interval="1"
                    @drag-end="setBrightness(group)"
                ></vue-slider>
            </div>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import colorConverter from '@/helpers/hueColorConverter'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'groupList',
    components: {
        VueSlider
    },
    props: {
        groups: {
            type: Array,
            default: () => []
        }
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
        getLights() {
            this.$store.dispatch('hueLights/fetchAllLights')
        },

        getAreaIconClass(className) {
            return require(`../assets/hue-icons/area_${className.toLowerCase()}.png`)
        },

        getBackgroundColor(group) {
            if (group.state.any_on) {
                const activeLights = this.getActiveLights(group)
                if (activeLights.length == 1) {
                    let rgb = colorConverter.calculateRGB(
                        activeLights[0].state.xy,
                        activeLights[0].state.bri,
                        activeLights[0].modelid
                    )
                    let hex = colorConverter.RGBToHEX(rgb.r, rgb.g, rgb.b)
                    return hex
                } else if (activeLights.length > 0) {
                    let partitionPercentage = 100 / activeLights.length
                    let gradientStringBuilder = 'linear-gradient(90deg,'
                    activeLights.forEach((d, i) => {
                        let rgb = colorConverter.calculateRGB(
                            d.state.xy,
                            d.state.bri,
                            d.modelid
                        )
                        let hex = colorConverter.RGBToHEX(rgb.r, rgb.g, rgb.b)
                        if (i == 0) {
                            gradientStringBuilder += `${hex} 0%,`
                        } else if (activeLights.length - 1 == i) {
                            gradientStringBuilder += `${hex} 100%`
                        } else {
                            gradientStringBuilder += `${hex} ${i *
                                partitionPercentage}%,`
                        }
                    })
                    gradientStringBuilder += ')'
                    return gradientStringBuilder
                }
            }
            return '#484848'
        },

        getForgroundColor(group) {
            if (group.state.any_on) {
                const activeLights = this.getActiveLights(group)
                let rgb = colorConverter.calculateRGB(
                    activeLights[0].state.xy,
                    activeLights[0].state.bri,
                    activeLights[0].modelid
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

        getBrightness(group) {
            if (group.state.any_on) {
                const activeLights = this.getActiveLights(group)

                let totalBrightness = 0
                activeLights.forEach(d => {
                    totalBrightness += d.state.bri
                })

                group.state.bri = totalBrightness / activeLights.length

                return group.state.bri
            }

            return 254
        },

        setBrightness(group) {
            const activeLights = this.getActiveLights(group)

            activeLights.forEach(light => {
                light.state.bri = group.state.bri
            })

            this.changeLightState(activeLights)
        },

        toggleOnState(group) {
            const activeLights = this.getAllLights(group)

            activeLights.forEach(light => {
                light.state.on = group.state.any_on
            })

            if (!group.state.any_on) {
                group.state.all_on = false
            } else {
                group.state.all_on = true
            }

            this.$store.commit('hueGroups/setGroup', group)

            this.changeLightState(activeLights)
        },

        getAllLights(group) {
            let allLights = []
            group.lights.forEach(d => {
                let index = this.lights.findIndex(
                    l => l.light_id === parseInt(d, 10)
                )
                allLights.push(this.lights[index])
            })
            allLights = allLights.sort((a, b) => {
                if (a.light_id < b.light_id) {
                    return -1
                }
                if (a.light_id > b.light_id) {
                    return 1
                }
                return 0
            })
            return allLights
        },

        getActiveLights(group) {
            let activeLights = []
            group.lights.forEach(d => {
                let index = this.lights.findIndex(
                    l => l.light_id === parseInt(d, 10)
                )
                const light = this.lights[index]
                if (light && light.state.on) {
                    activeLights.push(light)
                }
            })
            activeLights = activeLights.sort((a, b) => {
                if (a.light_id < b.light_id) {
                    return -1
                }
                if (a.light_id > b.light_id) {
                    return 1
                }
                return 0
            })
            return activeLights
        },

        getActiveLightCount(group) {
            const activeLights = this.getActiveLights(group)
            return activeLights.length
        },

        changeLightState(lights) {
            lights.forEach(light => {
                light.state.on = this.$store.dispatch(
                    'hueLights/setLightState',
                    light
                )
            })
        },

        groupClicked(group) {
            this.$emit('click', group.group_id)
        }
    },
    mounted() {
        this.getLights()
    }
}
</script>

<style scoped lang="scss">
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

        .group-info {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            min-height: 70px;
            flex: auto;
            cursor: pointer;

            .group-icon {
                filter: invert(1);
                flex: 0 0 3rem;
                align-items: center;
                display: flex;

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

                .light-count {
                    font-size: 13px;
                }
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
                    cursor: pointer;
                    /deep/ .custom-control-label::before {
                        border: none;
                        background-color: rgba(0, 0, 0, 0.3);
                        cursor: pointer;
                    }

                    /deep/ .custom-control-label::after {
                        background-color: #fff;
                        cursor: pointer;
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
</style>
