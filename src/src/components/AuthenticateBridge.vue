<template>
    <b-card title="Push-link" class="text-center">
        <b-card-text>
            <div id="setup-intro">
                Press the push-link button on the Hue Brdige you want to connect to.
                Don't wait to long as you only have {{ remainingTime }} seconds left to conform the connection!
            </div>

            <img src="@/assets/images/hue_bridge-link.png" alt="Philips Hue Bridge - Link" />

            <b-progress
                id="remainingTime"
                :value="remainingTime"
                min="0"
                max="30"
                variant="success"
            ></b-progress>
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
                    this.remainingTime == 20 ||
                    this.remainingTime == 10 ||
                    this.remainingTime == 5
                ) {
                    // check?
                }
            } else {
                clearInterval(this.countDownTimer)
            }
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

    #remainingTime .progress-bar {
        background-color: #3eaf7c !important;
    }
}
</style>
