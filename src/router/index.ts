import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import scanRoutes from './routes'
import nprogress from'nprogress'

const routes: RouteRecordRaw[] = [
	{
		path: '',
		redirect: '/dashboard',
	},
	...scanRoutes,
]


const router = createRouter({
	history: createWebHistory(),
	routes: routes,
})

router.beforeEach(()=>{
	nprogress.start()
})

router.afterEach(()=>{
	nprogress.done()
})

export default router
