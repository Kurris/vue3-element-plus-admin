import { AppRoute } from './type'
import scanRoutes from './routes'

const appRouteIndex: AppRoute = {
	path: '/index',
	component: () => import('@views/Index.vue'),
	name: 'index',
	meta: {
		title: '首页',
	},
	children: [...scanRoutes],
}

appRouteIndex.children!.push({
	path: '',
	redirect: '/index/dashboard',
})

export default appRouteIndex
