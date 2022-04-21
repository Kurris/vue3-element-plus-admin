import { AppRoute } from '../type'

const notfound: AppRoute = {
	path: '404',
	component: () => import('@/views/404.vue'),
	name: '404',
	meta: {
		title: '404',
	},
}

export default notfound
