<template>
    <b-navbar type="dark" variant="info" id="page-nav">
        <b-button
            class="navbar-toggler"
            :v-if="hideMenuButton != false"
            @click="menuButtonclicked()"
        >
            <font-awesome-icon icon="bars" />
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
        }
    },
    methods: {
        menuButtonclicked() {
            this.$store.dispatch(
                'appstate/changeSideBarState',
                !this.$store.getters['appstate/sideBarOpen']
            )
        }
    }
}
</script>

<style scoped lang="scss">
#page-nav {
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
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    #page-nav {
        button.navbar-toggler {
            display: none;
        }
    }
}
</style>
