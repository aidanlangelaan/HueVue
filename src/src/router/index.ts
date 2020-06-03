import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BridgeDetection from '../views/BridgeDetection.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Root',
		redirect: { name: 'Home' },
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
	},
	{
		path: '/bridgedetection',
		name: 'Bridge Detection',
		component: BridgeDetection,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
