import { IRouteMeta } from './type'
import { callback, loggout } from './sso/sso'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import appRouteIndex from './appRouteIndex'

import nprogress from 'nprogress'

const routes = [
	{
		path: '',
		redirect: '/index',
	},
	callback,
	loggout,
	appRouteIndex,
	{
		path: '/:pathMatch(.*)',
		redirect: '/index/notfound',
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes as RouteRecordRaw[], //类型继承可转为基类
})

router.beforeEach(guard => {
	nprogress.start()

	document.title = (guard.meta as unknown as IRouteMeta).title
})

router.afterEach(() => {
	nprogress.done()
})

export default router
