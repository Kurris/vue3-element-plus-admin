import AppRoute from '../type'
const test: AppRoute = {
	name: 'test',
	path: '/test',
	meta: {
		title: 'test route',
	},
	component: () => import('../../views/Test.vue'),
}

export default test
