<template>
	<el-container ref="app">
		<div>
			<div class="brand">品牌</div>
			<nav-bar :isCollapse="state.isCollapse" :activeNavbar="state.activeTab" :items="state.navItems" />
		</div>

		<el-container>
			<el-header>
				<header-bar @set-collapse="setCollapse" :breads="state.breads" :isCollapse="state.isCollapse" />
			</el-header>

			<tab-bar :tabItems="state.tabItems" :activeTab="state.activeTab" @tabChange="tabChange"
				@tabRemove="tabRemove" @reload="reload" @tabRemoveAll="tabRemoveAll"
				@tabRemoveCurrent="tabRemoveCurrent" @tabRemoveOther="tabRemoveOther" />
			<el-main>
				<router-view v-slot="{ Component }">
					<transition name="slide-fade" mode="out-in">
						<keep-alive :include="['test2']" v-if="state.compontIsShow">
							<component :is="Component" :key="$route.name" />
						</keep-alive>
					</transition>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { nextTick, reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import HeaderBar from './components/layout/HeaderBar.vue'
import TabBar from './components/layout/TabBar.vue'

import { TabPanelName } from 'element-plus'
import appRoute from './router/type'
import { ElMessage } from 'element-plus'
import { useResizeObserver } from '@vueuse/core'
import ITabItem from '@type/components/layout/ITabItem'
import IMenuItem from '@type/components/layout/IMenuItem'

let tabItems: ITabItem[] = [
	{
		title: '首页',
		name: 'dashboard',
		path: '/dashboard',
		closable: false,
	},
]
let state = reactive({
	isCollapse: false,
	tabItems: Array<ITabItem>(...tabItems),
	activeTab: 'dashboard',
	compontIsShow: true,
	breads: Array<string>(),
	navItems: Array<IMenuItem>(
		...[
			{
				displayName: '首页',
				route: '/dashboard',
				icon: 'view',
				children: [],
			},
			{
				displayName: '测试',
				route: '/test',
				icon: 'view',
				children: [
					{
						displayName: '测试子节点',
						route: '/test/son',
						icon: 'view',
						children: [],
					},
				],
			},
			{
				displayName: '测试2',
				route: '/test2',
				icon: 'view',
				children: [],
			},
		]
	),
})

const app = ref(null)

useResizeObserver(app, entries => {
	const entry = entries[0]
	const { width } = entry.contentRect
	if (width <= 750) {
		state.isCollapse = true
	}
})

const router = useRouter()

const reload = async () => {
	console.log('reload')

	state.compontIsShow = false
	await nextTick(() => {
		state.compontIsShow = true
	})
}

watch(
	() => router.currentRoute.value,
	newValue => {
		let appRoute = newValue as any as appRoute
		let existsItem = state.tabItems.find(x => x.name === appRoute.name)
		if (!existsItem) {
			existsItem = {
				title: appRoute.meta.title!,
				name: appRoute.name,
				path: appRoute.path,
				closable: true,
			}
			state.tabItems.push(existsItem)
		}
		state.activeTab = existsItem.name
		state.breads = findItem(existsItem.path, state.navItems).reverse()
	}
)

const findItem = (path: string, items: IMenuItem[]) => {
	let result: string[] = []
	for (let index = 0; index < items.length; index++) {
		const item = items[index]
		if (item.route == path) {
			result.push(item.displayName)
			return result
		} else {
			if (item.children && item.children.length > 0) {
				let deepItems = findItem(path, item.children) as unknown as string[]
				if (deepItems && deepItems.length > 0) {
					deepItems.push(item.displayName)
					return deepItems
				}
			}
		}
	}
	return result
}

const setCollapse = (isCollapse: boolean) => {
	state.isCollapse = isCollapse
}

const tabChange = (activeTab: TabPanelName) => {
	state.activeTab = activeTab.toString()

	let existsItem = state.tabItems.find(x => x.name == state.activeTab)
	if (existsItem) {
		let path = existsItem.path
		router.push({
			path: path,
		})
	}
}

const tabRemove = (tab: TabPanelName) => {
	let i = state.tabItems.findIndex(x => x.name == tab.toString())
	if (i >= 0) {
		state.tabItems.splice(i, 1)
		if (state.tabItems.length <= i) {
			i--
		}
		state.activeTab = state.tabItems[i].name
	}
}

const tabRemoveOther = () => {
	let i = state.tabItems.findIndex(x => x.name == state.activeTab)
	//不是最后一个
	if (i != state.tabItems.length - 1) {
		state.tabItems.splice(i + 1, state.tabItems.length - 1 - i)
	}

	if (i != 0 && i != 1) {
		state.tabItems.splice(1, i - 1)
	}
	ElMessage.success('移除其他页签')
}
const tabRemoveAll = () => {
	state.tabItems.splice(1, state.tabItems.length - 1)
	state.activeTab = state.tabItems[0].name
	ElMessage.success('移除所有页签')
}
const tabRemoveCurrent = () => {
	let i = state.tabItems.findIndex(x => x.name == state.activeTab)
	if (i > 0) {
		let item = state.tabItems[i]
		if (item.closable) {
			state.tabItems.splice(i, 1)

			if (state.tabItems.length <= i) {
				i--
			}
			state.activeTab = state.tabItems[i].name
		}
	}
	ElMessage.success('移除当前页签')
}
</script>

<style lang="scss">
@use './styles/global.scss'as *;

.brand {
	height: 50px;
	background-color: #2b2f3a;
	line-height: 50px;
	padding-left: 10px;
	color: white;
}

.el-main {
	overflow: hidden !important;
}

.el-header {
	height: 50px !important;
	padding: 0 !important;
}
</style>
