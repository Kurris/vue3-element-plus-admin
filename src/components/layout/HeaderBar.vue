<template>
	<div class="main-header">
		<div class="left">
			<el-icon class="navBarStatusIcon" @click="navStore.$state.isCollapse = !navStore.$state.isCollapse">
				<fold v-show="navStore.$state.isCollapse" />
				<expand v-show="!navStore.$state.isCollapse" />
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
</template>

<script setup lang="ts">
import { IMenuItem } from '@/type.d/components/layout/IMenuItem';
import { onBeforeMount, reactive } from 'vue';
import TopRight from './TopRight.vue'

import { useNavStore, useHeaderStore } from '@/stores/frameworkStore';
const navStore = useNavStore()
const headerStore = useHeaderStore()


const state = reactive({
	breads: Array<string>()
})


//note:链表反转算法
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

	headerStore.$state.setBreads = (path: string) => {
		let searchBreads: string[] = findItem(path, navStore.$state.items)
		state.breads = searchBreads.reverse()
		if (state.breads.length == 0) {
			setTimeout(() => {
				headerStore.$state.setBreads(path)
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
