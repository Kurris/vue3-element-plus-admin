<template>
	<div class="main-header">
		<div class="left">
			<el-icon class="navBarStatusIcon" @click="$emit('setCollapse', !isCollapse)">
				<fold v-show="isCollapse" />
				<expand v-show="!isCollapse" />
			</el-icon>

			<div class="breadCrumb">
				<el-breadcrumb separator="/">
					<template v-for="item in breads">
						<el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
					</template>
				</el-breadcrumb>
			</div>
		</div>

		<div class="right">
			<top-right />
		</div>
	</div>
</template>

<script setup lang="ts">
import TopRight from './TopRight.vue'

interface breadRecord {
	name: string
	path: string
}
defineProps<{
	breads: breadRecord[]
	isCollapse: boolean
}>()
defineEmits<{
	(e: 'setCollapse', isCollapse: boolean): void
}>()
</script>

<style scoped lang="scss">
.main-header {
	display: flex;
	justify-content: space-between;
	box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

	.left {
		display: flex;

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
		}
	}

	.right {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
