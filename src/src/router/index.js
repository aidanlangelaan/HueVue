import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Root',
        redirect: { name: 'Home' }
    },
    {
        path: '/setup',
        name: 'Setup',
        component: () => import('@/views/Setup.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { authorize: true }
    },
    {
        path: '/groups',
        name: 'Rooms & Zones',
        component: () => import('@/views/Groups.vue'),
        meta: { authorize: true }
    },
    {
        path: '/lights',
        name: 'Lights',
        component: () => import('@/views/Lights.vue'),
        meta: { authorize: true }
    },
    {
        path: '/scenes',
        name: 'Scenes',
        component: () => import('@/views/Scenes.vue'),
        meta: { authorize: true }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: { authorize: true }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const { authorize } = to.meta
    //const userToken = localStorage.getItem( 'hue', expirationDate )

    if (authorize) {
        const hueState = JSON.parse(localStorage.getItem('vuex'))

        if (!hueState || !hueState.hue.user || hueState.hue.user.length == 0) {
            return next({ path: '/setup' })
        }
    }

    next()
})

export default router
