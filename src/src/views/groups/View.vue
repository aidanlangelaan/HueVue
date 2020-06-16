<template>
    <div class="page-body">
        <nav-bar
            page-title="View group"
            class="page-header"
            :hide-menu-button="true"
            :show-back-button="true"
        />
        <div class="page-content">View group</div>
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
