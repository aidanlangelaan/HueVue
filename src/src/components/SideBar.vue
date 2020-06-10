<template>
    <div id="sidebar">
        <div id="brand">
            <router-link to="/">
                <span @click="navItemClicked()">
                    <span class="logo">
                        <img alt="HueVue" src="@/assets/images/lightbulb.svg" />
                    </span>
                    <span class="title">HueVue</span>
                </span>
            </router-link>
        </div>
        <nav>
            <router-link to="/home" class="nav-item">
                <span @click="navItemClicked()">
                    <b-icon icon="house-fill"></b-icon>
                    <span>Home</span>
                </span>
            </router-link>
            <router-link to="/groups" class="nav-item">
                <span @click="navItemClicked()">
                    <b-icon icon="door-closed-fill"></b-icon>
                    <span>Rooms & Zones</span>
                </span>
            </router-link>
            <router-link to="/lights" class="nav-item">
                <span @click="navItemClicked()">
                    <img src="@/assets/images/hue-bulb-classic.png" />
                    <span>Light setup</span>
                </span>
            </router-link>
            <router-link to="/scenes" class="nav-item">
                <span @click="navItemClicked()">
                    <b-icon icon="card-image"></b-icon>
                    <span>Scenes</span>
                </span>
            </router-link>
            <router-link to="/about" class="nav-item">
                <span @click="navItemClicked()">
                    <b-icon icon="info-circle-fill"></b-icon>
                    <span>About</span>
                </span>
            </router-link>
        </nav>
    </div>
</template>
<script>
export default {
    name: 'SideBar',
    methods: {
        navItemClicked() {
            this.$store.dispatch('appstate/changeSideBarState', false)
        }
    }
}
</script>

<style scoped lang="scss">
#sidebar {
    background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
        url(https://source.unsplash.com/random);
    background-repeat: no-repeat;
    background-size: cover;

    padding: 15px 15px;

    #brand {
        height: auto;
        padding: 10px 10px;
        border-bottom: 2px solid #444;

        > a {
            width: 100%;
            display: block;
            font-size: 23px;
            color: white;

            .logo {
                width: 50px;
                height: 50px;
                display: inline-block;
                background: white;
                border-radius: 50px;
                text-align: center;
                position: relative;

                > img {
                    width: 35px;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 2px;
                    right: 0;
                    margin: auto;
                    filter: invert(57%) sepia(59%) saturate(425%)
                        hue-rotate(101deg) brightness(91%) contrast(85%);
                }
            }

            .title {
                display: inline-block;
                margin-left: 20px;
                position: relative;
                top: -15px;
            }
        }

        &:hover {
            > a {
                color: white;
                text-decoration: none;

                .logo {
                    background: #3eaf7c;

                    > img {
                        filter: invert(100%) sepia(0%) saturate(0%)
                            hue-rotate(59deg) brightness(101%) contrast(102%);
                    }
                }
            }
        }
    }

    nav {
        margin-top: 30px;

        .nav-item {
            height: 45px;
            line-height: 50px;
            margin-bottom: 10px;
            border-radius: 4px;
            display: block;
            width: 100%;
            color: white;

            > span {
                display: block;
                width: 100%;
                padding: 0 20px;

                svg {
                    font-size: 24px;
                    margin-right: 20px;
                }

                img {
                    width: 28px;
                    margin-right: 16px;
                }

                span {
                    position: relative;
                    top: -2px;
                }
            }

            &:hover,
            &.router-link-active {
                background: #3eaf7c;
                text-decoration: none;
            }
        }
    }
}
</style>
