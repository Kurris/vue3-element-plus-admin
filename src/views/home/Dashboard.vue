<template>
	<div>
		<Table row-key="date" request-url="weatherforecast/weatherforecast" :columns="[{
			prop: 'date',
			lable: '日期',
		}, {
			prop: 'summary',
			lable: '摘要',
			slotName: 'summary',
		}, {
			prop: 'temperatureC',
			lable: '摄氏度',
			editable: true
		}, {
			prop: 'temperatureF',
			lable: '华氏度'
		}, {
			slotName: 'op',
		}]">

			<template #summary="{ scope }">
				<el-tag>{{ scope.row.summary }}</el-tag>
			</template>


			<template #opHeader>
				<el-input placeholder="search" />
			</template>
			<template #op>
				<el-button type="text" size="small">Detail</el-button>
				<el-button type="text" size="small">Edit</el-button>
			</template>
		</Table>
	</div>
</template>

<script setup lang="ts">
import Table from '@/components/ui/Table.vue';

</script>
<style>
</style>
