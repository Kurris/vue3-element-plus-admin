import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./routes/**/*.ts')

const routes: RouteRecordRaw[] = []

Object.keys(modules).forEach(key => {
	const mod = modules[key].default || {}

	const modList = Array.isArray(mod) ? [...mod] : [mod]
	routes.push(...modList)
})

console.log(routes)

export default routes
