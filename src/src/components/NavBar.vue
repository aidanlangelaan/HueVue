<template>
    <b-navbar type="dark" variant="info" id="page-nav">
        <b-button
            class="navbar-toggler"
            v-if="!hideMenuButton"
            @click="menuButtonclicked()"
        >
            <font-awesome-icon icon="bars" />
        </b-button>

        <b-button
            class="back-button"
            v-if="showBackButton"
            @click="backButtonClicked()"
        >
            <font-awesome-icon icon="angle-left" />
        </b-button>

        <b-navbar-brand>{{ pageTitle }}</b-navbar-brand>
    </b-navbar>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        pageTitle: String,
        hideMenuButton: {
            type: Boolean,
            default: false
        },
        showBackButton: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        menuButtonclicked() {
            this.$store.dispatch(
                'appstate/changeSideBarState',
                !this.$store.getters['appstate/sideBarOpen']
            )
        },

        backButtonClicked() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="scss">
#page-nav {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    background-color: #3eaf7c !important;

    button.navbar-toggler {
        display: block;
        color: white;
        background: none;
        margin-right: 20px;
        border: none;
        font-size: 25px;

        &:active,
        &:focus {
            border: none;
            outline: none;
            box-shadow: none;
        }
    }

    button.back-button {
        display: block;
        color: white;
        background: none;
        border: none;
        font-size: 23px;
        padding: 0 43px 0 12px;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    #page-nav {
        button.navbar-toggler,
        button.back-button {
            display: none;
        }
    }
}
</style>
