import { IAppRoute } from '../type'

export const notfound: IAppRoute = {
	path: 'notfound',
	component: () => import('@/views/common/NotFound.vue'),
	name: 'notfound',
	meta: {
		title: '找不到访问页面',
	},
}
