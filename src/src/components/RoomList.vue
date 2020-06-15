<template>
    <b-card no-body header="Your rooms" footer-tag="footer">
        <b-list-group flush>
            <b-list-group-item
                v-for="room in rooms"
                :key="room.group_id"
                href="#"
                class="group-item"
            >
                <div class="group-icon">
                    <img :src="getAreaIconClass(room.class)" />
                </div>
                <div class="group-description">
                    <div class="name">{{ room.name }}</div>
                    <div class="light-count">
                        {{ room.lights.length }} Hue light<span
                            v-if="room.lights.length > 1"
                            >s</span
                        >
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
        <template v-slot:footer>
            <b-button @click="createNewRoom">
                Create new room
            </b-button>
        </template>
    </b-card>
</template>

<script>
//import colorConverter from '@/helpers/hueColorConverter'
//import VueSlider from 'vue-slider-component'
//import 'vue-slider-component/theme/default.css'

export default {
    name: 'RoomList',
    components: {
        //VueSlider
    },
    data() {
        return {}
    },
    computed: {
        rooms: {
            get() {
                return this.$store.getters['hueGroups/getRooms']
            },
            set(rooms) {
                this.$store.commit('hueGroups/setRooms', rooms)
            }
        }
    },
    methods: {
        getAreaIconClass(className) {
            return require(`../assets/hue-icons/area_${className.toLowerCase()}.png`)
        },

        createNewRoom() {
            this.$router.push({ name: 'groups.add-room' })
        },

        editRoom(room) {
            this.$router.push({
                name: 'groups.edit',
                params: { id: room.group_id }
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

            .light-count {
                font-size: 13px;
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
