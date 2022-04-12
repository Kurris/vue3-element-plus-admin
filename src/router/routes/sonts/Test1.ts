import AppRoute from '../../type'

const test1: AppRoute = {
	name: 'test1',
	path: '/test1',
	meta: {
		title: 'test1 route',
	},
	component: () => import('../../../views/Test1.vue'),
}

export default test1
