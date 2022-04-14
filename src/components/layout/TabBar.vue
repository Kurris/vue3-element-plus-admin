<template>
	<div class="main-tabs">
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

		<div class="tabOperation">
			<div class="refresh is-o">刷新</div>
			<div class="dropDown is-o">下拉</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import TabItemType from '@type/components/layout/TabItemType'
import { TabPanelName } from 'element-plus'

const props = defineProps<{
	tabItems: TabItemType[]
	activeTab: string
}>()

const emit = defineEmits<{
	(e: 'tabChange', activeTab: TabPanelName): void
	(e: 'tabRemove', tab: TabPanelName): void
}>()

const tabChange = (activeTab: TabPanelName) => emit('tabChange', activeTab)
const tabRemove = (tab: TabPanelName) => emit('tabRemove', tab)
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
		// display: flex;
		// justify-content: center;
		// align-items: center;
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

	.tabOperation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 38px * 2;
		height: $height;
		margin-left: 10px;
		margin-right: 10px;
		background-color: antiquewhite;

		.is-o {
			line-height: $height;
			height: $height;
			width: $height;
			background-color: white;
		}
	}
}
</style>
