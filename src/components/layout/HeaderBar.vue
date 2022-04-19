<template>
	<div class="main-header">
		<div class="left">
			<el-icon class="navBarStatusIcon" @click="$emit('setCollapse', !isCollapse)">
				<fold v-show="isCollapse" />
				<expand v-show="!isCollapse" />
			</el-icon>

			<div class="breadCrumb">

				<el-breadcrumb separator="/">
					<transition-group name="list" mode="out-in">
						<template v-for="(item, index) in breads">
							<el-breadcrumb-item v-if="index == breads.length - 1">
								<b style="color: black;">{{ item }}</b>
							</el-breadcrumb-item>
							<el-breadcrumb-item v-else>
								{{ item }}
							</el-breadcrumb-item>
						</template>
					</transition-group>
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


defineProps<{
	breads: string[]
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
			height: var(--header-height);
			width: 50px;
		}

		.navBarStatusIcon:hover {
			cursor: pointer;
		}

		.breadCrumb {
			display: flex;
			height: var(--header-height);
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
