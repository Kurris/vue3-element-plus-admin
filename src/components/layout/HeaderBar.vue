<template>
	<div class="main-header">
		<el-icon class="navBarStatusIcon" @click="setCollapse">
			<fold v-show="state.isCollapse" />
			<expand v-show="!state.isCollapse" />
		</el-icon>

		<div class="breadCrumb">
			<el-breadcrumb separator="/">
				<template v-for="item in breads">
					<el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<top-right />
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TopRight from './TopRight.vue'

interface breadRecord {
	name: string
	path: string
}

let state = reactive({
	isCollapse: false,
})

const props = defineProps<{
	breads: breadRecord[]
}>()

const emit = defineEmits<{
	(e: 'setCollapse', isCollapse: boolean): void
}>()

const setCollapse = () => {
	state.isCollapse = !state.isCollapse
	emit('setCollapse', state.isCollapse)
}
</script>

<style scoped lang="scss">
.main-header {
	display: flex;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

	.navBarStatusIcon {
		height: 50px;
		width: 50px;
	}

	.navBarStatusIcon:hover {
		cursor: pointer;
	}

	.breadCrumb {
		display: flex;
		height: 50px;
		align-items: center;
		justify-content: center;

		// .el-breadcrumb__item {
		// 	:hover {
		// 		cursor: pointer;
		// 	}
		// }
	}
}
</style>
