<template>
    <div class="page-body">
        <nav-bar
            page-title="Edit group"
            class="page-header"
            :hide-menu-button="true"
            :show-back-button="true"
        />
        <div class="page-content">
            Edit a group
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    components: {
        NavBar
    },
    data() {
        return {}
    },
    methods: {},
    mounted: function() {}
}
</script>

<style scoped lang="scss"></style>
