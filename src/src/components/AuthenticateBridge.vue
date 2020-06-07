<template>
    <b-card title="Push-link" class="text-center">
        <b-card-text>
            <div id="setup-intro">
                Press the push-link button on the Hue Brdige you want to connect to.
                Don't wait to long as you only have {{ remainingTime }} seconds left to confirm the connection!
            </div>

            <img src="@/assets/images/hue_bridge-link.png" alt="Philips Hue Bridge - Link" />

            <b-progress
                id="remainingTime"
                :value="remainingTime"
                min="0"
                max="30"
                variant="success"
            ></b-progress>

            <b-button
                v-if="remainingTime < 10 && remainingTime > 0"
                @click="addTime"
            >Give me more time!</b-button>
        </b-card-text>
    </b-card>
</template>
<script>
export default {
    name: 'AuthenticateBridge',
    data() {
        return {
            countDownTimer: null,
            remainingTime: 30
        }
    },
    methods: {
        countDown() {
            if (this.remainingTime > 0) {
                this.remainingTime -= 1

                if (
                    this.remainingTime == 25 ||
                    this.remainingTime == 20 ||
                    this.remainingTime == 15 ||
                    this.remainingTime == 5 ||
                    this.remainingTime == 0
                ) {
                    this.$store.dispatch('hue/createUser').then(result => {
                        if (result) {
                            this.$emit('nextStep')
                        }
                    })
                }
            } else {
                clearInterval(this.countDownTimer)

                if (this.$store.getters['hue/getUser'].length == 0) {
                    this.$emit('previousStep')
                }
            }
        },

        addTime() {
            this.remainingTime += 10
        }
    },
    mounted: function() {
        this.remainingTime = 30
        this.countDownTimer = setInterval(this.countDown, 1000)
    }
}
</script>

<style scoped lang="scss">
.card {
    #setup-intro {
        margin-bottom: 20px;
    }

    img {
        max-width: 242px;
        width: 100%;
        margin-bottom: 20px;
    }

    #remainingTime {
        .progress-bar {
            background-color: #3eaf7c !important;
        }
    }

    button {
        margin-top: 30px;
        background-color: #3eaf7c;
        border-color: #3eaf7c;
    }
}
</style>
