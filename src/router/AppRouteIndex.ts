import { IAppRoute } from './type'
import scanRoutes from './scanRoutes'

import { notfound } from './common/notfound'
import { forbiden } from './common/forbiden'

const appRouteIndex: IAppRoute = {
	path: '/index',
	component: () => import('@views/Index.vue'),
	name: 'index',
	meta: {
		title: '首页',
	},
	children: [...scanRoutes, forbiden, notfound],
}

appRouteIndex.children!.push({
	path: '',
	redirect: '/index/dashboard',
})

export default appRouteIndex
