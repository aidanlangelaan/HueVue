<template>
    <div class="page-body">
        <nav-bar page-title="Rooms & Zones" class="page-header" />
        <div class="page-content">
            <rooms />
            <zones />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Rooms from '@/components/Rooms'
import Zones from '@/components/Zones'

export default {
    components: {
        NavBar,
        Rooms,
        Zones
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
