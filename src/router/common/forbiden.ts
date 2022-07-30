import { IAppRoute } from '../type'

export const forbiden: IAppRoute = {
	path: 'forbiden',
	component: () => import('@/views/common/Forbiden.vue'),
	name: 'forbiden',
	meta: {
		title: '无权限访问访问',
	},
}
