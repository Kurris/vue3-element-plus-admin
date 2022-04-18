import AppRoute from '../type'

const test: AppRoute = {
	name: 'test',
	path: '/test',
	meta: {
		title: '测试路由',
	},
	component: () => import('../../views/Test.vue'),
	children: [
		{
			name: '',
			meta: {},
			path: '/',
			redirect: '/son',
		},
		{
			name: 'son',
			path: 'son',
			meta: {
				title: '子节点',
			},
			component: () => import('../../views/TestSon.vue'),
		},
	],
}

export default test
