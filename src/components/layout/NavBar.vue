<template>
	<el-menu :collapse="isCollapse" :collapse-transition="false" active-text-color="#409eff" background-color="#304156" default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
		<el-sub-menu index="1">
			<template #title>
				<el-icon>
					<location />
				</el-icon>
				<span>Navigator</span>
			</template>
			<el-menu-item-group title="Group One">
				<el-menu-item index="1-1">item1</el-menu-item>
				<el-menu-item index="1-2">item1</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="Group Two">
				<el-menu-item index="1-3">item3</el-menu-item>
			</el-menu-item-group>
			<el-sub-menu index="1-4">
				<template #title>item four</template>
				<el-menu-item index="1-4-1">item1</el-menu-item>
			</el-sub-menu>
		</el-sub-menu>
		<el-menu-item index="3" disabled>
			<el-icon>
				<document />
			</el-icon>
			<span>Navigator3</span>
		</el-menu-item>
	</el-menu>
</template>

<script lang="ts" setup>
const props = defineProps<{
	isCollapse: boolean
}>()

const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
</script>
<style scoped></style>
