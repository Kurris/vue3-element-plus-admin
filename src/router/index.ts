import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from './AppRouteIndex'

import nprogress from 'nprogress'

const routes = [
	{
		path: '',
		redirect: '/index/dashboard',
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/index/404',
	},
	home,
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes as unknown as RouteRecordRaw[],
})

router.beforeEach((to, from, next) => {
	nprogress.start()
	next()
})

router.afterEach(() => {
	nprogress.done()
})

export default router
