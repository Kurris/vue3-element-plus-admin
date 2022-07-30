import { IAppRoute } from '../type'

export const callback: IAppRoute = {
	path: '/callback',
	component: () => import('@/views/sso/Callback.vue'),
	name: 'callback',
	meta: {
		title: '登录回调中...',
	},
}

export const loggout: IAppRoute = {
	path: '/loggout',
	component: () => import('@/views/sso/Loggout.vue'),
	name: 'loggout',
	meta: {
		title: '退出',
	},
}
