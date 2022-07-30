import { IAppRoute } from '../../type'

const dashboard: IAppRoute = {
	path: 'dashboard',
	component: () => import('@views/home/Dashboard.vue'),
	name: 'dashboard',
	meta: {
		title: 'dashboard',
	},
}

export default dashboard
