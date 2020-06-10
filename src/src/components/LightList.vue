<template>
    <b-card no-body header="Your lights">
        <b-list-group flush>
            <b-list-group-item
                v-for="light in lights"
                :key="light.name"
                href="#"
                class="group-item"
            >
                <div class="group-icon">
                    A
                </div>
                <div class="group-description">
                    <div class="name">{{ light.name }}</div>
                    <div
                        class="state-description"
                        v-if="!light.state.reachable"
                    >
                        Unreachable
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
export default {
    name: 'LightList',
    data() {
        return {
            lights: [],
            unwatcher: ''
        }
    },
    methods: {
        getLights() {
            this.lights = this.$store.getters['hue/getLights']
        },

        getLightIconClass(className) {
            return require(`../assets/hue-icons/area_${className.toLowerCase()}.png`)
        },

        addNewLight() {
            this.$router.push({ name: 'lights.add' })
        },

        viewLight(light) {
            this.$router.push({
                name: 'lights.view',
                params: { id: light.name }
            })
        }
    },
    mounted() {
        this.getLights()
    },
    created() {
        this.unwatcher = this.$store.watch(
            (state, getters) => getters.getLights,
            (newValue, oldValue) => {
                console.log(`Updating from ${oldValue} to ${newValue}`)
            }
        )
    },
    beforeDestroy() {
        if (this.unwatcher != '') {
            this.unwatcher()
        }
    }
}
</script>

<style scoped lang="scss">
.card {
    background: none;
    border: none;

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
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        .group-icon {
            flex: 3rem 0;
            filter: invert(1);

            img {
                height: 30px;
                position: relative;
                top: 20%;
            }
        }

        .group-description {
            .name {
                font-weight: bold;
                font-size: 17px;
            }

            .state-description {
                font-size: 13px;
                color: orange;
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
