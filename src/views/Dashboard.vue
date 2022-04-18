<template>
	<el-pagination small background v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
		:page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
		layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
		@current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { onBeforeMount, onActivated, ref } from 'vue'
import { test } from '../net/api/test'

const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
	console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`)
}


onBeforeMount(async () => {
	let res = await test({
		a: 'ligy22222'
	})
	console.log(res);

})
onActivated(() => console.log('actived'))
</script>
<style>
</style>
