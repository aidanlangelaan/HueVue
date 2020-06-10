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
        meta: { authorize: true },
        component: () => import('@/views/groups/Group.vue'),
        children: [
            {
                path: '',
                name: 'groups',
                component: () => import('@/views/groups/List.vue')
            },
            {
                path: 'list',
                name: 'groups.list',
                component: () => import('@/views/groups/List.vue')
            },
            {
                path: 'add-room',
                name: 'groups.add-room',
                component: () => import('@/views/groups/Add.vue')
            },
            {
                path: 'add-zone',
                name: 'groups.add-zone',
                component: () => import('@/views/groups/Add.vue')
            },
            {
                path: 'edit/:id',
                name: 'groups.edit',
                component: () => import('@/views/groups/Edit.vue')
            }
        ]
    },
    {
        path: '/lights',
        component: () => import('@/views/lights/Lights.vue'),
        meta: { authorize: true },
        children: [
            {
                path: '',
                name: 'lights',
                component: () => import('@/views/lights/List.vue')
            },
            {
                path: 'list',
                name: 'lights.list',
                component: () => import('@/views/lights/List.vue')
            },
            {
                path: 'add',
                name: 'lights.add',
                component: () => import('@/views/lights/Add.vue')
            },
            {
                path: 'view/:id',
                name: 'lights.view',
                component: () => import('@/views/lights/View.vue')
            }
        ]
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
