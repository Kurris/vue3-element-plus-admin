<template>
	<el-container>
		<el-aside :class="{ setAsideWidth: state.isCollapse }">
			<div style="height: 50px; background-color: #2b2f3a; line-height: 50px; padding-left: 10px; color: white">品牌</div>
			<nav-bar :isCollapse="state.isCollapse" :activeNavbar="state.activeTab" />
		</el-aside>

		<el-container>
			<el-header>
				<header-bar
					@set-collapse="setCollapse"
					:breads="[
						{ name: 'ligy', path: '/test/son' },
						{ name: 'ligy', path: '/test/son' },
					]"
				/>
			</el-header>

			<tab-bar :tabItems="state.tabItems" :activeTab="state.activeTab" @tabChange="tabChange" @tabRemove="tabRemove" />
			<el-main>
				<!-- <router-link to="/test1">route link </router-link> -->
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import HeaderBar from './components/layout/HeaderBar.vue'
import TabBar from './components/layout/TabBar.vue'
import TabItemType from '@type/components/layout/TabItemType'
import { TabPanelName } from 'element-plus'

const route = useRoute()
const router = useRouter()

let tabItems: TabItemType[] = [
	{
		title: '首页',
		name: 'dashboard',
		closable: false,
	},
]

let state = reactive({
	isCollapse: false,
	tabItems: Array<TabItemType>(...tabItems),
	activeTab: 'dashboard',
})

watch(
	() => [route.path, route.meta, route.name],
	to => {
		let path: any = to[0]
		let meta: any = to[1]
		let name: any = to[2]

		let existsItem = state.tabItems.find(x => x.name === name)
		if (!existsItem) {
			existsItem = {
				title: meta.title,
				name: name,
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

	let path = state.tabItems.find(x => x.name == state.activeTab)!.name
	router.replace({
		path: path,
	})
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
</script>

<style lang="scss">
@use './styles/global.scss' as *;

.setAsideWidth {
	width: 65px !important;
}

.el-aside {
	overflow-y: hidden !important;

	:hover {
		overflow-y: auto !important;
	}
}
</style>
