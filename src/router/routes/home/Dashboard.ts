import { AppRoute } from '../../type'

const dashboard: AppRoute = {
	path: 'dashboard',
	component: () => import('@views/home/Dashboard.vue'),
	name: 'dashboard',
	meta: {
		title: '首页',
	},
}

export default dashboard
