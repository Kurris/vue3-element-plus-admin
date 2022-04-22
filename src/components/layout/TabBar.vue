<template>
	<div class="main-tabs">
		<el-tabs v-model="state.activeTab" type="card" @tab-change="tabChange" @tab-remove="tabRemove">
			<el-tab-pane v-for="item in state.tabItems" :key="item.name" :label="item.title" :name="item.name"
				:closable="item.closable">
				<template #label>
					<el-icon class="activeTabIcon">
						<football />
					</el-icon>
					{{ item.title }}
				</template>
			</el-tab-pane>
		</el-tabs>

		<div class="op">
			<div class="is-o dropDown" @click="showDropdown">
				<el-dropdown ref="dropdownOp" trigger="click" class="line-height: 36px;" popper-class="mainTabDropdown"
					@command="handleCommand">
					<el-icon style="height: 12px; width: 12px">
						<caret-bottom />
					</el-icon>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="tabRemoveCurrent" :disabled="$route.path == '/index/dashboard'">
								关闭当前</el-dropdown-item>
							<el-dropdown-item command="tabRemoveOther" :disabled="!closeOther">关闭其他</el-dropdown-item>
							<el-dropdown-item command="tabRemoveAll" :disabled="!closeAll" divided>关闭所有
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<span style="font-size: 12px; line-height: 36px; margin-left: 5px">页签操作</span>
			</div>
			<div class="refresh is-o" @click="$emit('reload')">
				<el-icon>
					<refresh />
				</el-icon>
				<span style="margin-left: 5px">刷新</span>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { AppRoute } from '@/router/type';
import { useHeaderStore, useTabStore } from '@/stores/frameworkStore';
import ITabItem from '@type/components/layout/ITabItem'
import { TabPanelName } from 'element-plus'
import { onMounted, reactive, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const headerStore = useHeaderStore()
const tabStore = useTabStore()

const router = useRouter()
const route = useRoute()

let dropdownOp = ref()

defineEmits<{
	(e: 'reload'): void
}>()

const state = reactive({
	activeTab: 'dashboard',
	tabItems: Array<ITabItem>(...[
		{
			title: 'Dashboard',
			name: 'dashboard',
			path: '/index/dashboard',
			closable: false,
		},
	]),
})

/**
 * 跳转到404
*/
const to404 = () => {
	let existsItem = state.tabItems.find(x => x.name == '404')
	if (!existsItem) {
		existsItem = {
			title: '404',
			name: '404',
			path: '/index/404',
			closable: true,
		}
		state.tabItems.push(existsItem)
	}
	state.activeTab = existsItem.name
}



/**
 * 主动展开下拉
*/
const showDropdown = () => {
	dropdownOp.value.handleOpen()
}


/**
 * 切换tab
*/
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

/**
 * 移除当前tab
 */
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

/**
 * 下拉命令执行
*/
const handleCommand = (command: string) => {
	if (command == 'tabRemoveAll') {
		tabRemoveAll()
	} else if (command == 'tabRemoveCurrent') {
		tabRemoveCurrent()
	} else {
		tabRemoveOther()
	}
}

/**
 * 移除其他tab
 */
const tabRemoveOther = () => {
	let i = state.tabItems.findIndex(x => x.name == state.activeTab)
	//不是最后一个
	if (i != state.tabItems.length - 1) {
		state.tabItems.splice(i + 1, state.tabItems.length - 1 - i)
	}

	if (i != 0 && i != 1) {
		state.tabItems.splice(1, i - 1)
	}
}

/**
 * 移除所有tab
 */
const tabRemoveAll = () => {
	state.tabItems.splice(1, state.tabItems.length - 1)
	state.activeTab = state.tabItems[0].name
}

/**
 * 移除当前tab
 */
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
}

/**
 * 添加tab
 */
const addOrLocateTab = (appRoute: AppRoute) => {
	let existsItem = state.tabItems.find(x => x.name == appRoute.name)
	if (!existsItem) {
		existsItem = {
			title: appRoute.meta!.title!,
			name: appRoute.name!,
			path: appRoute.path,
			closable: true,
		}
		state.tabItems.push(existsItem)
	}
	state.activeTab = existsItem.name
	headerStore.$state.setBreads(existsItem.path)
}


const closeOther = computed(() => {
	if (state.tabItems.length == 1) return false

	if (state.tabItems.length == 2 && state.activeTab == route.name && state.activeTab != "dashboard") return false

	return true;
})

const closeAll = computed(() => state.tabItems.length > 1)

/**
 * 监视路由变化(导航栏切换),添加或者定位到当前tab
 */
watch(
	() => router.currentRoute.value,
	newValue => {
		let appRoute = newValue as any as AppRoute
		addOrLocateTab(appRoute)
	}
)

onMounted(() => {
	if (router.currentRoute.value.name == '404') {
		to404()
		headerStore.$state.setBreads('/index/404')
	} else {
		addOrLocateTab(router.currentRoute.value as any as AppRoute)
	}
})

</script>

<style scoped lang="scss">
$height: 36px;

.main-tabs {
	display: flex;
	justify-content: space-between;
	height: $height;
	border: none;
	box-shadow: 0 1px 4px #c1c1c1;


	.activeTabIcon {
		display: none;
	}

	:deep(.el-tabs) {
		border: none !important;
		margin-left: 10px !important;
		width: 90%;

		.el-tabs__header {
			border: none;

			.el-tabs__nav-wrap {
				margin-top: 5px;
				border: none;
				border: none;
				box-shadow: none;

				// is-disabled
				.el-tabs__nav-next {
					height: $height;
					line-height: 28px;
					border-left: 1px solid #f1f1f1;
				}

				.el-tabs__nav-prev {
					height: $height;
					line-height: 28px;
					border-right: 1px solid #f1f1f1;
				}

				.is-top {
					border: unset !important;
					box-shadow: unset !important;
				}

				.el-tabs__item {
					height: 26px;
					line-height: 23.5px;
					padding-left: 18px !important;
					padding-right: 18px !important;
					border-radius: 2px;
					transition: unset !important;
					font-size: 10px;
					border: 1px solid #d8dce4 !important;
					box-shadow: none !important;

					&:hover {
						transition: unset !important;
						color: unset;
						padding: unset;
						transition: unset;
					}

					&.is-active {
						.activeTabIcon {
							display: inline;
						}
					}

					&+.el-tabs__item {
						margin-left: 5px;
					}

					&.is-active {
						color: white;
						background-color: #04699d;
						width: unset;
					}

					.is-icon-close {
						height: 12px !important;
						width: 12px !important;
					}

					.el-icon.activeTabIcon {
						bottom: 0.5px;

						svg {
							background-color: white;
							border-radius: 50px;
							height: 8px;
							width: 8px;
						}
					}
				}
			}
		}
	}

	.op {
		position: absolute;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: $height;
		font-size: 12px;
		color: #606266;

		.is-o {
			padding-left: 10px;
			padding-right: 10px;
			height: $height;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: $height;
		}

		div:hover {
			cursor: pointer;
			background-color: #f2f2f2;
			color: #409eff;
		}
	}
}
</style>
