<template>
	<el-scrollbar>
		<el-menu :collapse="isCollapse" router active-text-color="#409eff" background-color="#304156"
			:default-active="$route.path" text-color="white" class="el-menu-vertical">
			<template v-for="item in state.items">
				<menu-tree :item="item" />
			</template>
		</el-menu>
	</el-scrollbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import MenuTree from './MenuTree.vue'

defineProps<{
	isCollapse: boolean
	activeNavbar: string
}>()

const arr = [
	{
		displayName: "首页",
		route: "/dashboard",
		icon: "view",
		children: [],
	},
	{
		displayName: "测试",
		route: "/test",
		icon: "view",
		children: [
			{
				displayName: "测试子节点",
				route: "/test/son",
				icon: "view",
				children: [],
			}
		],
	}
]


const state = reactive({
	items: arr
})

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
</style>
