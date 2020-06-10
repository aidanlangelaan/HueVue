<template>
    <div class="page-body">
        <nav-bar page-title="Rooms & Zones" class="page-header" />
        <div class="page-content">
            <room-list />
            <zone-list />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import RoomList from '@/components/RoomList'
import ZoneList from '@/components/ZoneList'

export default {
    components: {
        NavBar,
        RoomList,
        ZoneList
    },
    data() {
        return {}
    },
    methods: {
        fetchGroups() {
            // fetch the latest rooms
            this.$store.dispatch('hue/fetchGroups')
        }
    },
    mounted: function() {
        this.fetchGroups()
    }
}
</script>

<style scoped lang="scss">
.card {
    margin-bottom: 10px;
}
</style>
