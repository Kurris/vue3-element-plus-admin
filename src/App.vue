<template>
	<el-container ref="app">
		<div style="">
			<div class="brand">
				品牌
			</div>
			<nav-bar :isCollapse="state.isCollapse" :activeNavbar="state.activeTab" />
		</div>

		<el-container>
			<el-header style="height: 50px !important;padding: 0 !important;">
				<header-bar @set-collapse="setCollapse" :breads="[
					{
						path: 'test',
						name: 'test',
					},
				]" :isCollapse="state.isCollapse" />
			</el-header>

			<tab-bar :tabItems="state.tabItems" :activeTab="state.activeTab" @tabChange="tabChange"
				@tabRemove="tabRemove" @reload="reload" @tabRemoveAll="tabRemoveAll"
				@tabRemoveCurrent="tabRemoveCurrent" @tabRemoveOther="tabRemoveOther" />
			<el-main>
				<transition name="fade" mode="out-in">
					<keep-alive v-if="state.compontIsShow">
						<router-view v-slot="{ Component }">
							<component :is="Component" :key="$route.name" />
						</router-view>
					</keep-alive>
				</transition>
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
import TabItemType from '@type/components/layout/TabItemType'
import { TabPanelName } from 'element-plus'
import appRoute from './router/type'
import { computed } from '@vue/reactivity'


import { ElMessage } from 'element-plus'

import { useResizeObserver } from '@vueuse/core'

let tabItems: TabItemType[] = [
	{
		title: '首页',
		name: 'dashboard',
		path: '/dashboard',
		closable: false
	},
]
let state = reactive({
	isCollapse: false,
	tabItems: Array<TabItemType>(...tabItems),
	activeTab: 'dashboard',
	compontIsShow: true,
})

const app = ref(null)

useResizeObserver(app, entries => {
	const entry = entries[0]
	const { width } = entry.contentRect
	state.isCollapse = width <= 750
})

const router = useRouter()

const reload = async () => {


	state.compontIsShow = false
	await nextTick(() => {
		state.compontIsShow = true
	})
}

// const breads = computed(() => {
// 	let matched = router.currentRoute.value.matched
// })

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
	}
)

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
	color: white
}


.el-main {
	overflow: hidden !important;
}
</style>
