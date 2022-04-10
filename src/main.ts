import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue'


import 'normalize.css'


var app= createApp(App)

//引用element plus
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

//引用全局图标
let currentIcons :any= icons
for(const iconName in currentIcons){
    app.component(iconName,currentIcons[iconName])
}


app.mount('#app')
