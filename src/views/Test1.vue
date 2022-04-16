<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header">
				<span>test1</span>
				<el-button class="button" type="text">Operation button</el-button>
			</div>
		</template>
		<div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
	</el-card>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, onActivated } from 'vue'


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
