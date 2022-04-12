<template>
	<div class="main-tabs">
		<el-tabs v-model="state.activeTab" type="card">
			<el-tab-pane v-for="item in state.tabs" :key="item.name" :label="item.title" :name="item.name" :closable="item.closable">
				<template #label>
					<el-icon class="activeTabIcon">
						<d-arrow-right />
					</el-icon>
					{{ item.title }}
				</template>
			</el-tab-pane>
		</el-tabs>

		<div class="tabOperation">tab 操作栏</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
	activeTab: '1',
	tabs: [
		{
			title: 'Tab 1',
			name: '1',
			content: 'Tab 1 content',
			closable: true,
		},
		{
			title: 'Tab 2',
			name: '2',
			content: 'Tab 2 content',
			closable: false,
		},
	],
})
</script>

<style scoped lang="scss">
.el-tabs.el-tabs--top.el-tabs--card {
	height: 36px;
}

.el-tabs__item {
	&.is-active {
		.activeTabIcon {
			display: inline;
		}
	}
}

.activeTabIcon {
	display: none;
}

.main-tabs {
	display: flex;
	justify-content: space-between;
	box-shadow: 0 1px 4px #c1c1c1;

	.tabOperation {
		display: flex;
		align-items: center;
		width: 150px;
		height: 36px;
		margin-left: 10px;
		background-color: antiquewhite;
	}
}
</style>
