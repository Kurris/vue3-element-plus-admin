import AppRoute from '../type'
const test: AppRoute = {
	name: 'test',
	path: '/test',
	meta: {
		title: 'test route',
	},
	component: () => import('../../views/Test.vue'),
	children: [
		{
			name: 'son',
			path: 'son',
			meta: {
				title: 'son',
			},
			component: () => import('../../views/TestSon.vue'),
		},
	],
}

export default test
