import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import scanRoutes from './routes'

const routes: RouteRecordRaw[] = [
	{
		path: '',
		redirect: '/test',
	},
	...scanRoutes,
]

console.log(routes)

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
})

export default router
