<template>
    <div class="page-body">
        <nav-bar page-title="Rooms" class="page-header" />
        <div class="page-content">Rooms</div>
    </div>
</template>

<script>
import { hueService } from '@/services/HueService'
import NavBar from '@/components/NavBar'

export default {
    components: {
        NavBar
    },
    data() {
        return {}
    },
    methods: {
        getAllGroups() {
            hueService
                .getAllGroups()
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted: function() {
        this.getAllGroups()
    }
}
</script>
