<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>test</span>
				<el-button class="button" type="text">Operation button</el-button>
			</div>
		</template>
		<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
	</el-card>
</template>

<script setup lang="ts" name="test">
import { onBeforeMount, onBeforeUnmount } from 'vue'

onBeforeMount(() => {
	console.log('before mount')
})

onBeforeUnmount(() => {
	console.log('before unmount')
})
</script>

<style>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.box-card {
	width: 480px;
}
</style>
