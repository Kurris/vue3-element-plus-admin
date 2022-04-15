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

			<tab-bar :tabItems="state.tabItems" :activeTab="state.activeTab" @tabChange="tabChange" @tabRemove="tabRemove" @reload="reload" />
			<el-main>
				<router-view v-slot="{ Component }">
					<keep-alive :include="['test']">
						<transition name="fade" mode="out-in">
							<component :is="Component" v-if="state.compontIsShow" :key="$route.name" />
						</transition>
					</keep-alive>
				</router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { inject, nextTick, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import HeaderBar from './components/layout/HeaderBar.vue'
import TabBar from './components/layout/TabBar.vue'
import TabItemType from '@type/components/layout/TabItemType'
import { TabPanelName } from 'element-plus'

const route = useRoute()
const router = useRouter()

const reload = async () => {
	console.log('reload')

	state.compontIsShow = false
	await nextTick(() => {
		state.compontIsShow = true
	})
}

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
	compontIsShow: true,
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

.el-header {
	height: 50px !important;
	padding: 0 !important;
}
.el-container {
	height: 100vh;
}

.el-aside {
	overflow-x: hidden !important;
	border: none;
	background-color: var(--navbar-color);
	transition: width 0.3s ease;
	max-width: 210px !important;
	box-shadow: 1px 0 0 #d8dce4 !important;
}

.el-menu {
	height: 100% !important;
	border: none !important;
	max-width: 210px !important;
}

/* 渐变设置 */
.fade-enter-from,
.fade-leave-to {
	transform: translateX(30px);
	opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}
.fade-enter-active {
	transition: all 0.3s ease;
}
.fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
