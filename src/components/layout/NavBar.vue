<template>
	<div class="main-menu">
		<el-scrollbar>
			<!-- background-color="#304156" -->
			<el-menu :collapse="navStore.$state.isCollapse" router :active-text-color="navActiveTextColor"
				:background-color="backgroundColor" :default-active="$route.path" text-color="black"
				class="el-menu-vertical">
				<template v-for="item in navStore.$state.items">
					<menu-tree :item="item" />
				</template>
				<li style="flex:1;"></li>
			</el-menu>

		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import MenuTree from './MenuTree.vue'
import { IMenuItem } from '@type/components/layout/IMenuItem'
import http from '@/net/http';
import { useNavStore } from '@/stores/frameworkStore';
const navStore = useNavStore()



// 获取根元素
var r = document.querySelector(':root')!;
//获取根的样式（属性和值）
var rs = getComputedStyle(r);
//获取指定的变量
let navBarColor = rs.getPropertyValue('--navbar-color')
let activeTextColor = rs.getPropertyValue('--active-text-color')

const backgroundColor = ref(navBarColor)
const navActiveTextColor = ref(activeTextColor)


onBeforeMount(async () => {

	try {
		var res = await http<Array<IMenuItem>>({
			useNotify: false,
			url: 'menus',
			method: 'get',
		})
		navStore.$state.items = res
	} catch {
		navStore.$state.items = Array<IMenuItem>(...[
			{
				displayName: '首页',
				route: '首页',
				icon: 'home-filled',
				visiable: true,
				children: [
					{
						displayName: 'Dashboard',
						route: '/index/dashboard',
						icon: '',
						visiable: true,
						children: [],
					},
					{
						displayName: '个人中心',
						route: '/index/myzoom',
						icon: '',
						visiable: true,
						children: [],
					},
					{
						displayName: '404',
						route: '/index/404',
						icon: '',
						visiable: false,
						children: [],
					}
				],
			}
		])
	}


})

</script>
<style scoped lang="scss">
.el-menu-vertical:not(.el-menu--collapse) {
	width: 285px;
	min-height: 400px;
}

.el-menu {
	height: 100vh;
	border: none !important;
}

.main-menu {
	box-shadow: 0px 1px 4px 0px #c1c1c1
}
</style>
