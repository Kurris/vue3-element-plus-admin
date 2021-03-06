import { IAppRoute } from './type'

const modules = import.meta.globEager('./routes/**/*.ts')

const routes: IAppRoute[] = []

Object.keys(modules).forEach(key => {
	const mod = modules[key].default || {}
	const modList = Array.isArray(mod) ? [...mod] : [mod]
	routes.push(...modList)
})

export default routes
