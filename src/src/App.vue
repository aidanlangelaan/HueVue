<template>
    <div id="app" class="container-fluid h-100">
        <div
            class="row h-100"
            v-bind:class="{
                'side-bar-open':
                    this.$store.getters['appstate/sideBarOpen'] == true
            }"
        >
            <div id="left" class="h-100">
                <side-bar class="h-100" />
            </div>
            <div id="right" class="h-100">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar'

export default {
    components: {
        SideBar
    }
}
</script>
