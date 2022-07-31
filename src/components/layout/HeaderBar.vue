<template>
	<div class="main-header">
		<div class="left">
			<el-icon class="navBarStatusIcon" @click="menuSwitchCollapse">
				<fold v-show="navStore.isCollapse" />
				<expand v-show="!navStore.isCollapse" />
			</el-icon>

			<div class="breadCrumb">
				<el-breadcrumb separator="/">
					<transition-group name="list" mode="out-in">
						<template v-for="(item, index) in state.breads">
							<el-breadcrumb-item v-if="index == state.breads.length - 1">
								<b style="color: black;">{{ item }}</b>
							</el-breadcrumb-item>
							<el-breadcrumb-item v-else>
								{{ item }}
							</el-breadcrumb-item>
						</template>
					</transition-group>
				</el-breadcrumb>

			</div>
		</div>
		<div class="right">
			<top-right />
		</div>
	</div>

	<el-drawer v-model="state.drawerMenuShow" direction="ttb" :before-close="drawerMenuBeforeClose">
		<span>移动端自定义菜单显示</span>
	</el-drawer>
</template>

<script setup lang="ts">
import { IMenuItem } from '@/type.d/components/layout/IMenuItem';
import { nextTick, onBeforeMount, reactive } from 'vue';
import TopRight from './TopRight.vue'

import { useNavStore, useHeaderStore } from '@/stores/frameworkStore';
const navStore = useNavStore()
const headerStore = useHeaderStore()


const state = reactive({
	breads: Array<string>(),
	drawerMenuShow: false
})

/** 菜单展开/隐藏 */
const menuSwitchCollapse = () => {
	navStore.isCollapse = !navStore.isCollapse
	if (navStore.isHidden) {
		state.drawerMenuShow = true
	}
}

/** top2bottom 菜单关闭前 */
const drawerMenuBeforeClose = (done: () => void) => {
	navStore.isCollapse = !navStore.isCollapse
	done()
}

/** note:链表反转算法 */
const findItem = (path: string, items: IMenuItem[]) => {
	for (let index = 0; index < items.length; index++) {
		const item = items[index]
		if (item.route == path) {
			return Array<string>(...[item.displayName])
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
	return []
}

onBeforeMount(() => {
	console.log('header beforemount');

	headerStore.setBreads = (path: string) => {
		let searchBreads: string[] = findItem(path, navStore.items)
		state.breads = searchBreads.reverse()
		if (state.breads.length == 0) {
			setTimeout(() => {
				nextTick(() => headerStore.setBreads(path));
			}, 200)
		}
	}
})

</script>

<style scoped lang="scss">
.main-header {
	display: flex;
	justify-content: space-between;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

	.left {
		display: flex;

		.navBarStatusIcon {
			height: var(--header-height);
			width: 50px;
		}

		.navBarStatusIcon:hover {
			cursor: pointer;
		}

		.breadCrumb {
			display: flex;
			height: var(--header-height);
			align-items: center;
			justify-content: center;
		}
	}

	.right {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
