import { RouteRecordRaw } from 'vue-router'

// Omit typescript 中用于移除父级的属性,并且返回新的类型
// 此处逐步移除属性,用增强类型提醒

export interface IRouteMeta {
	title: string
}

/**
 * @todo 重新定义name,增加keepalive属性
 */
declare interface IAppRouteRecordRaw extends Omit<RouteRecordRaw, 'name'> {
	name?: string
	keepalive?: boolean
}

/**
 * @todo 重新定义meta,元数据属性
 */
declare interface IAppRouteRecordRaw1 extends Omit<IAppRouteRecordRaw, 'meta'> {
	meta?: IRouteMeta
}

/**
 * @todo 重新定义children属性为当前类型
 */
declare interface IAppRouteRecordRaw2 extends Omit<IAppRouteRecordRaw1, 'children'> {
	children?: IAppRouteRecordRaw2[]
}

export type IAppRoute = IAppRouteRecordRaw2
