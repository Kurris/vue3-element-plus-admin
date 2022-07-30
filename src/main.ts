import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'

import * as icons from '@element-plus/icons-vue'

import 'normalize.css'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'
import './styles/popper.scss'
import './styles/animation.scss'

import router from './router/index'
import directiveInstall from './directive/Index'

var app = createApp(App)

//引用element plus
app.use(ElementPlus, { zIndex: 3000 })

//引用全局图标
let currentIcons: any = icons
for (const iconName in currentIcons) {
	app.component(iconName, currentIcons[iconName])
}

console.log(`VITE_HTTP_BASEURL:${import.meta.env.VITE_HTTP_BASEURL}`)

directiveInstall(app)
app.use(router).use(createPinia()).mount('#app')
