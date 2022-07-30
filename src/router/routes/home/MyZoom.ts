import { IAppRoute } from '../../type'

const myzoom: IAppRoute = {
	path: 'myzoom',
	component: () => import('@views/home/MyZoom.vue'),
	name: 'myzoom',
	meta: {
		title: '个人中心',
	},
}

export default myzoom
