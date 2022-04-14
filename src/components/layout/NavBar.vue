<template>
	<!-- background-color="#304156" -->
	<el-menu :collapse="isCollapse" router :collapse-transition="false" active-text-color="#409eff" background-color="#304156" :default-active="activeNavbar" text-color="#fff">
		<el-menu-item index="dashboard">
			<el-icon>
				<document />
			</el-icon>
			<span>首页</span>
		</el-menu-item>
		<el-sub-menu index="1">
			<template #title>
				<el-icon>
					<location />
				</el-icon>
				<span>Navigator</span>
			</template>
			<el-menu-item-group title="Group One">
				<el-menu-item index="test1">test1</el-menu-item>
				<el-menu-item index="test">test</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="Group Two">
				<el-menu-item index="1-3">item3</el-menu-item>
			</el-menu-item-group>
			<el-sub-menu index="1-4">
				<template #title>item four</template>
				<el-menu-item index="1-4-1" @click="itemClick">item1</el-menu-item>
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
import { useRouter } from 'vue-router'

const props = defineProps<{
	isCollapse: boolean
	activeNavbar: string
}>()
const router = useRouter()

const itemClick = (item: any) => {
	router.push(item.index)
}
</script>
<style scoped></style>
