<template>
	<div class="main-tabs">
		<el-tabs v-model="state.activeTab" type="card" @tab-change="tabChange" @tab-remove="tabRemove">
			<template v-for="item in state.tabItems" :key="item.name">
				<el-tab-pane :label="item.title" :name="item.name" :closable="item.closable">
					<template #label>
						<el-icon class="activeTabIcon">
							<football />
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</template>
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
	<ContextMenu key="tabBar" ref="contextMenu" :items="[
	{
		name: 'refresh',
		displayName: '刷新',
		icon: '',
		event: () => {
			emit('reload')
		}
	}
]"></ContextMenu>
</template>


<script lang="ts" setup>
import { useHeaderStore } from '@/stores/frameworkStore';
import ITabItem from '@type/components/layout/ITabItem'
import { TabPaneName } from 'element-plus'
import { onMounted, reactive, ref, watch, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router';
// import Sortable from 'sortablejs';
import { IAppRoute } from '@/router/type';
import ContextMenu from '../ui/ContextMenu.vue';
import { IContextMemuItem } from '../ui/Type';

const headerStore = useHeaderStore()

const router = useRouter()
const route = useRoute()

let dropdownOp = ref()
let contextMenu = ref()

let emit = defineEmits<{
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
	contextMenuItems: Array<IContextMemuItem>()
})

/** 跳转到404 */
const to404 = () => {
	let existsItem = state.tabItems.find(x => x.name == 'notfound')
	if (!existsItem) {
		existsItem = {
			title: '404',
			name: 'notfound',
			path: '/index/notfound',
			closable: true,
		}
		state.tabItems.push(existsItem)
	}
	state.activeTab = existsItem.name
}


/** 主动展开下拉 */
const showDropdown = () => {
	dropdownOp.value.handleOpen()
}


/** 切换tab */
const tabChange = (activeTab: TabPaneName) => {

	state.activeTab = activeTab.toString()
	let existsItem = state.tabItems.find(x => x.name == activeTab.toString())
	//存在tab项并且当前的路由有改变,路由跳转
	if (existsItem && router.currentRoute.value.path != existsItem.path) {
		let path = existsItem.path
		router.push({
			path: path,
		})
	}
}

/** 移除当前tab */
const tabRemove = (tab: TabPaneName) => {
	let i = state.tabItems.findIndex(x => x.name == tab.toString())
	if (i >= 0) {
		state.tabItems.splice(i, 1)
		if (state.tabItems.length <= i) {
			i--
		}
		state.activeTab = state.tabItems[i].name
	}
}

/** 下拉命令执行 */
const handleCommand = (command: string) => {
	if (command == 'tabRemoveAll') {
		tabRemoveAll()
	} else if (command == 'tabRemoveCurrent') {
		tabRemoveCurrent()
	} else {
		tabRemoveOther()
	}
}

/** 移除其他tab */
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

/** 移除所有tab */
const tabRemoveAll = () => {
	state.tabItems.splice(1, state.tabItems.length - 1)
	state.activeTab = state.tabItems[0].name
}

/** 移除当前tab */
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

/** 添加tab */
const addOrLocateTab = (appRoute: IAppRoute) => {
	let existsItem = state.tabItems.find(x => x.name == appRoute.name)
	if (!existsItem) {
		existsItem = {
			title: appRoute.meta!.title!,
			name: appRoute.name!,
			path: appRoute.path,
			closable: true,
		}
		state.tabItems.push(existsItem)
		nextTick(() => {
			//f12查看id规则
			const element = document.getElementById(`tab-${existsItem!.name}`)
			if (element) {
				contextMenu.value.onRightClick(element)
			}
		})
	}

	state.activeTab = existsItem.name
	headerStore.$state.setBreads(existsItem.path)
}

/** 是否可以关闭其他 */
const closeOther = computed(() => {
	if (state.tabItems.length == 1) {
		return false
	}

	if (state.tabItems.length == 2
		&& state.activeTab == route.name
		&& state.activeTab != "dashboard") {
		return false
	}

	return true;
})

/** 是否可以关闭全部 */
const closeAll = computed(() => state.tabItems.length > 1)

/** 监视路由变化(导航栏切换),添加或者定位到当前tab */
watch(
	() => router.currentRoute.value,
	newValue => {
		let appRoute = newValue as unknown as IAppRoute
		addOrLocateTab(appRoute)
	}
)

onMounted(() => {
	if (router.currentRoute.value.name == 'notfound') {
		headerStore.$state.setBreads('/index/notfound')
		to404()
	} else {
		addOrLocateTab(router.currentRoute.value as any as IAppRoute)
	}


	// const el: HTMLElement = document.querySelector(".el-tabs__nav")!;
	// if (el) {
	// 	nextTick(() => {
	// 		Sortable.create(el, {
	// 			animation: 150,
	// 			onEnd({ newIndex, oldIndex }) {
	// 				//oldIIndex拖放前的位置， newIndex拖放后的位置  
	// 				const currRow = state.tabItems.splice(oldIndex!, 1)[0];
	// 				state.tabItems.splice(newIndex!, 0, currRow);
	// 			},
	// 		});
	// 	})
	// }
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

		.el-tabs__header {
			border: none;

			.el-tabs__nav-wrap {
				margin-top: 5px;
				border: none;
				box-shadow: none;

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
					background-color: white;
					height: 26px;
					line-height: 23.5px;
					padding-left: 18px !important;
					padding-right: 18px !important;
					border-radius: 4px;
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
