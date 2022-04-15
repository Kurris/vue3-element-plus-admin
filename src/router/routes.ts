import { RouteRecordRaw } from 'vue-router'
// import.meta.globEager 是vite提供的函数可以引入指定目录里面的所有指定类型文件返回数组
const modules = import.meta.globEager('./routes/*.ts')
const moduleDeeps = import.meta.globEager('./routes/**/*.ts')

const routes: RouteRecordRaw[] = []

Object.keys(modules).forEach(key => {
	const mod = modules[key].default || {}

	const modList = Array.isArray(mod) ? [...mod] : [mod]
	routes.push(...modList)
})

Object.keys(moduleDeeps).forEach(key => {
	const mod = moduleDeeps[key].default || {}

	const modList = Array.isArray(mod) ? [...mod] : [mod]
	routes.push(...modList)
})


export default routes
