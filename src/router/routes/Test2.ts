import AppRoute from '../type'

const test: AppRoute = {
	name: 'test2',
	path: '/test2',
	meta: {
		title: '测试路由2',
	},
	component: () => import('../../views/Test2.vue'),
}

export default test
