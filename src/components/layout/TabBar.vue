<template>
	<div class="main-tabs">
		<el-tabs v-model="activeTab" type="card" @tab-change="tabChange" @tab-remove="tabRemove">
			<el-tab-pane v-for="item in tabItems" :key="item.name" :label="item.title" :name="item.name"
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
							<el-dropdown-item command="tabRemoveCurrent">关闭当前</el-dropdown-item>
							<el-dropdown-item command="tabRemoveOther">关闭其他</el-dropdown-item>
							<el-dropdown-item command="tabRemoveAll" divided>关闭所有</el-dropdown-item>
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
import TabItemType from '@type/components/layout/ITabItem'
import { TabPanelName } from 'element-plus'
import { ref } from 'vue'

defineProps<{
	tabItems: TabItemType[]
	activeTab: string
}>()

const emit = defineEmits<{
	(e: 'tabChange', activeTab: TabPanelName): void
	(e: 'tabRemove', tab: TabPanelName): void
	(e: 'tabRemoveCurrent'): void
	(e: 'tabRemoveOther'): void
	(e: 'tabRemoveAll'): void
	(e: 'reload'): void
}>()

const tabChange = (activeTab: TabPanelName) => emit('tabChange', activeTab)
const tabRemove = (tab: TabPanelName) => emit('tabRemove', tab)

let dropdownOp = ref()
const showDropdown = () => {
	dropdownOp.value.handleOpen()
}



const handleCommand = (command: string) => {
	if (command == 'tabRemoveAll') {
		emit('tabRemoveAll')
	} else if (command == 'tabRemoveCurrent') {
		emit('tabRemoveCurrent')
	} else if (command == 'tabRemoveOther') {
		emit('tabRemoveOther')
	}
}

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
						background-color: #2aba85;
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
