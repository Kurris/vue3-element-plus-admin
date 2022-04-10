<template>
	<el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable>
		<el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
			{{ item.content }}
		</el-tab-pane>
	</el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
	{
		title: 'Tab 1',
		name: '1',
		content: 'Tab 1 content',
	},
	{
		title: 'Tab 2',
		name: '2',
		content: 'Tab 2 content',
	},
])
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}
.main-tab {
	height: 36px;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
}
</style>
