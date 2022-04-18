<template>
	<div class="main-menu">
		<el-scrollbar>
			<!-- background-color="#304156" -->
			<el-menu :collapse="isCollapse" router active-text-color="#409eff" background-color="#304156"
				:default-active="$route.path" text-color="white" class="el-menu-vertical" @select="select">
				<template v-for="item in items">
					<menu-tree :item="item" />
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import MenuTree from './MenuTree.vue'

defineProps<{
	isCollapse: boolean
	activeNavbar: string
	items: IMenuItem[]
}>()

const emits = defineEmits<{
	(e: 'selectIndex', indexPaths: string[]): void
}>()

interface IMenuItem {
	displayName: string
	route: string
	icon: string
	children: IMenuItem[]
}

const select = (_: string, indexPaths: string[]) => {
	emits('selectIndex', indexPaths)
}
</script>
<style scoped lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
	width: 210px;
	min-height: 400px;
}

.el-menu {
	height: 100vh;
	border: none !important;

}

.main-menu {
	box-shadow: 0px 2px 4px 0px #c1c1c1
}
</style>
