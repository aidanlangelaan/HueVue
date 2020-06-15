<template>
    <div class="page-body">
        <nav-bar page-title="Lights" class="page-header" />
        <div class="page-content">
            <light-list />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import LightList from '@/components/LightList'

export default {
    components: {
        NavBar,
        LightList
    },
    data() {
        return {}
    },
    methods: {
        fetchLights() {
            // fetch the latest lights
            this.$store.dispatch('hueLights/fetchAllLights')
        }
    },
    mounted: function() {
        this.fetchLights()
    }
}
</script>

<style scoped lang="scss">
.card {
    margin-bottom: 10px;
}
</style>
