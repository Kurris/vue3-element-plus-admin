<template>
	<div>
		<Table request-url="weatherforecast/weatherforecast" :columns="[{
			prop: 'date',
			lable: '日期'
		}, {
			prop: 'summary',
			lable: '摘要',
			slotName: 'summary'
		}, {
			prop: 'temperatureC',
			lable: '摄氏度'
		}, {
			prop: 'temperatureF',
			lable: '华氏度'
		}, {
			slotName: 'op',
		}]">

			<template #summary="{ scope }">
				<el-tag>{{ scope.row.summary }}</el-tag>
			</template>


			<template #op>
				<el-button type="text" size="small">Detail</el-button>
				<el-button type="text" size="small">Edit</el-button>
			</template>

			<template #opHeader>
				<el-input placeholder="search" />
			</template>

		</Table>


	</div>
</template>

<script setup lang="ts">
import { onActivated } from 'vue'
import Table from '@/components/ui/Table.vue';


onActivated(() => console.log('actived'))
</script>
<style>
</style>
