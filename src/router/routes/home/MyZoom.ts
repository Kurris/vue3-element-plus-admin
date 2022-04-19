import { AppRoute } from '../../type'

const myzoom: AppRoute = {
	path: 'myzoom',
	component: () => import('@views/home/MyZoom.vue'),
	name: 'myzoom',
	meta: {
		title: '个人中心',
	},
}

export default myzoom
