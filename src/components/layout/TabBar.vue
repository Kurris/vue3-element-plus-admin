<template>
	<div class="main-tabs">
		<div class="left">
			<el-tabs v-model="activeTab" type="card" @tab-change="tabChange" @tab-remove="tabRemove">
				<el-tab-pane v-for="item in tabItems" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
					<template #label>
						<el-icon class="activeTabIcon">
							<d-arrow-right />
						</el-icon>
						{{ item.title }}
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>

		<div class="op">
			<div class="is-o dropDown" @click="showDropdown">
				<el-dropdown ref="dropdownOp" trigger="click" class="line-height: 36px;">
					<el-icon style="height: 12px; width: 12px">
						<caret-bottom />
					</el-icon>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="personalZoom">关闭当前</el-dropdown-item>
							<el-dropdown-item command="logout">关闭其他</el-dropdown-item>
							<el-dropdown-item command="dashboard" divided>关闭所有</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
				<span style="font-size: 12px; line-height: 36px; margin-left: 5px">页签操作</span>
			</div>
			<div class="refresh is-o" @click="$emit('reload')">
				<el-icon><refresh /></el-icon>
				<span style="margin-left: 5px">刷新</span>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import TabItemType from '@type/components/layout/TabItemType'
import { TabPanelName } from 'element-plus'
import { ref, provide } from 'vue'

const props = defineProps<{
	tabItems: TabItemType[]
	activeTab: string
}>()

const emit = defineEmits<{
	(e: 'tabChange', activeTab: TabPanelName): void
	(e: 'tabRemove', tab: TabPanelName): void
	(e: 'reload'): void
}>()

const tabChange = (activeTab: TabPanelName) => emit('tabChange', activeTab)
const tabRemove = (tab: TabPanelName) => emit('tabRemove', tab)

let dropdownOp = ref()
const showDropdown = () => {
	dropdownOp.value.handleOpen()
}

provide('reload', () => {
	return Math.random()
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
		margin-left: 10px !important ;

		.el-tabs__header {
			border: none;

			.el-tabs__nav-wrap {
				margin-top: 5px;
				border: none;
				border: none;
				box-shadow: none;

				.is-top {
					border: unset !important;
					box-shadow: unset !important;
				}

				.el-tabs__item {
					height: 26px;
					line-height: 26px;
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

					& + .el-tabs__item {
						margin-left: 5px;
					}

					&.is-active {
						color: white;
						background-color: #2aba85;
						width: unset;
					}

					.is-icon-close {
						height: 12px !important;
						width: 12px !important;
					}
				}
			}
		}
	}

	.op {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: $height;
		font-size: 12px;
		color: #606266;
		width: 150px;

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
		}
	}
}
</style>
