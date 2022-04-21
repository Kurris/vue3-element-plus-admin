import { RouteRecordRaw } from 'vue-router'
import RouteMeta from '@type/router/RouteMeta'

declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'name'> {
	name?: string
	keepalive?: boolean
}

declare interface AppRouteRecordRaw1 extends Omit<AppRouteRecordRaw, 'meta'> {
	meta?: RouteMeta
}

declare interface AppRouteRecordRaw2 extends Omit<AppRouteRecordRaw1, 'children'> {
	children?: AppRouteRecordRaw2[]
}

export type AppRoute = AppRouteRecordRaw2
