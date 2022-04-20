import { App } from 'vue'

export default (app: App<Element>) => {
	app.directive('ripple', {
		mounted(el) {
			el.addEventListener('click', (e: any) => {
				import('./Ripple').then(x => {
					x.default(el, e)
				})
			})
		},
	})
}
