<template>
    <div class="page-body">
        <nav-bar
            page-title="Setup"
            class="page-header"
            :hide-menu-button="true"
        />
        <div class="page-content">
            <detect-bridge @nextStep="nextStep" v-if="setupStage == 1" />
            <authenticate-bridge
                @nextStep="nextStep"
                @previousStep="previousStep"
                v-if="setupStage == 2"
            />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import DetectBridge from '@/components/DetectBridge'
import AuthenticateBridge from '@/components/AuthenticateBridge'

export default {
    components: {
        NavBar,
        DetectBridge,
        AuthenticateBridge
    },
    data() {
        return {
            setupStage: 1
        }
    },
    methods: {
        nextStep() {
            this.setupStage += 1

            if (this.setupStage == 3) {
                this.$router.push('home')
            }
        },
        previousStep() {
            if (this.setupStage > 1) {
                this.setupStage -= 1
            }
        }
    },
    mounted: function() {}
}
</script>

<style lang="scss" scoped></style>
