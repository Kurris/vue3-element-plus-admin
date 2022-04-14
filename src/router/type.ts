import { RouteRecordRaw } from 'vue-router'
import { Component } from 'vue'
import RouteMeta from '@type/router/RouteMeta'


declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'name'> {
	name: string,
	keepalive?:boolean,
}

declare interface AppRouteRecordRaw1 extends Omit<AppRouteRecordRaw, 'meta'> {
	meta: RouteMeta
}

declare interface AppRouteRecordRaw2 extends Omit<AppRouteRecordRaw1, 'component'> {
	component: Component | string
}

declare interface AppRouteRecordRaw3 extends Omit<AppRouteRecordRaw2, 'children'> {
	children?: AppRouteRecordRaw3[]
}

export default AppRouteRecordRaw3
