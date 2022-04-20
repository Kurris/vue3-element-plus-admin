import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import * as icons from '@element-plus/icons-vue'

import 'normalize.css'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import './styles/popper.scss'
import './styles/animation.scss'

import router from './router/index'

var app = createApp(App)

//引用element plus
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

//引用全局图标
let currentIcons: any = icons
for (const iconName in currentIcons) {
	app.component(iconName, currentIcons[iconName])
}

console.log(`VITE_HTTP_BASEURL:${import.meta.env.VITE_HTTP_BASEURL}`)

app.use(router).mount('#app')

app.directive('ripple', {
	mounted(el) {
		el.addEventListener('click', (e: any) => {
			let x = e.clientX - el.offsetLeft
			let y = e.clientY - el.offsetTop

			//在鼠标位置增加一个span标签
			let span = document.createElement('span')
			span.style.position = 'absolute'
			span.style.backgroundColor = '#d9dadb'
			span.style.opacity = '1'
			span.style.borderRadius = '50%'
			span.style.zIndex = el.style.zIndex
			span.style.maxWidth = el.offsetWidth
			span.style.maxHeight = el.offsetHeight

			el.style.overflow = 'hidden'
			el.append(span)
			let width = 0
			let height = 0
			let opacity: any = 1
			let max_length = Math.sqrt(el.offsetWidth * el.offsetWidth + el.offsetHeight * el.offsetHeight) * 2

			let time: any = setInterval(() => {
				width += 20
				height += 20
				opacity -= 0.02
				if (opacity <= 0) {
					clearInterval(time)
					time = null
					span.remove()
				} else {
					if (width < max_length) {
						//判断超出最大值时，清除定时，并且删除span
						span.style.width = width + 'px'
						span.style.height = height + 'px'
						span.style.opacity = opacity
						span.style.left = x - span.offsetWidth / 2 + 'px'
					} else {
						clearInterval(time)
						time = null
						span.remove()
					}
				}
			}, 10)
		})
	},
})
