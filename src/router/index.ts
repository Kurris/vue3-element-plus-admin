import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from './AppRouteIndex'

import nprogress from 'nprogress'

const routes = [
	{
		path: '',
		redirect: '/index/dashboard',
	},
	home,
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes as unknown as RouteRecordRaw[],
})

router.beforeEach(() => {
	nprogress.start()
})

router.afterEach(() => {
	nprogress.done()
})

export default router
