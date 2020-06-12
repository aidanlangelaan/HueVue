<template>
    <b-card no-body header="Your lights">
        <b-list-group flush>
            <b-list-group-item
                v-for="light in lights"
                :key="light.name"
                href="#"
                class="group-item"
                @click="flashLight(light)"
            >
                <div class="group-icon">
                    <img :src="getLightIconClass(light.config.archetype)" />
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
                <div class="group-action" @click.stop="viewLight">
                    <font-awesome-icon icon="info-circle" />
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

        getLightIconClass(archetype) {
            return require(`../assets/hue-icons/light_${archetype.toLowerCase()}.png`)
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
        height: 85px;

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
        }
    }

    .card-footer {
        background: none;
        border: none;
        padding-top: 15px;
    }
}
</style>
