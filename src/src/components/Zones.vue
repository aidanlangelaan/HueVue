<template>
    <b-card no-body header="Your zones" footer-tag="footer">
        <group-list :groups="zones" />
        <template v-slot:footer>
            <b-button @click="createNewZone">Create new zone</b-button>
        </template>
    </b-card>
</template>

<script>
import GroupList from '@/components/GroupList'

export default {
    name: 'Zones',
    components: {
        GroupList
    },
    props: {
        groups: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    },
    computed: {
        zones: {
            get() {
                return this.$store.getters['hueGroups/getZones']
            },
            set(zones) {
                this.$store.commit('hueGroups/setZones', zones)
            }
        }
    },
    methods: {
        createNewZone() {
            this.$router.push({ id: 'groups.add-zone' })
        },

        editZone(zone) {
            this.$router.push({
                name: 'groups.edit',
                params: { id: zone.group_id }
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
