<template>
	<div class="main-menu">
		<el-scrollbar>
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
	<div class="setting">
		<el-dropdown trigger="click">
			<el-icon style="cursor: pointer;">
				<Setting />
			</el-icon>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="navStore.showBrand = !navStore.showBrand">{{ navStore.showBrand ?
		'隐藏' : '显示'
}}logo</el-dropdown-item>
					<el-dropdown-item @click="tabStore.isHidden = !tabStore.isHidden">{{ tabStore.isHidden ?
		'显示' :
		'隐藏'
}}页签</el-dropdown-item>
					<el-dropdown-item @click="navStore.useRipple = !navStore.useRipple">{{ navStore.useRipple ?
		'禁用' :
		'启用'
}}菜单水波纹效果</el-dropdown-item>
					<el-dropdown-item disabled divided>v0.0.1</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue';
import MenuTree from './MenuTree.vue'
import { IMenuItem } from '@type/components/layout/IMenuItem'
import { useNavStore, useTabStore } from '@/stores/frameworkStore';
const navStore = useNavStore()
const tabStore = useTabStore()

// 获取根元素
var r = document.querySelector(':root')!;
//获取根的样式（属性和值）
var rs = getComputedStyle(r);
//获取指定的变量
let navBarColor = rs.getPropertyValue('--navbar-color')
let activeTextColor = rs.getPropertyValue('--active-text-color')

const backgroundColor = ref(navBarColor)
const navActiveTextColor = ref(activeTextColor)

const logoHeight = computed(() => {
	if (navStore.showBrand) {
		return '50px'
	}
	return '0px'
})

onBeforeMount(async () => {

	try {
		// var res = await http<Array<IMenuItem>>({
		// 	useNotify: false,
		// 	url: 'menus',
		// 	method: 'get',
		// })
		// console.log(res);

		// navStore.items = res.data
	} catch {

	}

	navStore.items = Array<IMenuItem>(...[
		{
			displayName: '首页',
			route: '首页',
			icon: 'home-filled',
			visible: true,
			children: [
				{
					displayName: 'Dashboard',
					route: '/index/dashboard',
					icon: '',
					visible: true,
					children: [],
				},
				{
					displayName: '个人中心',
					route: '/index/myzoom',
					icon: '',
					visible: true,
					children: [],
				},
				{
					displayName: '404',
					route: '/index/404',
					icon: '',
					visible: false,
					children: [],
				}
			],
		}
	])
})

</script>
<style scoped lang="scss">
$settingHeight : 6vh;

.el-menu-vertical:not(.el-menu--collapse) {
	width: 285px;
	min-height: 400px;
}

.el-menu {
	height: calc(100vh - $settingHeight - v-bind(logoHeight));
	border: none !important;
}

.main-menu {
	box-shadow: 0px 1px 4px 0px #c1c1c1
}

.setting {
	display: flex;
	align-items: center;
	border: 1px solid rgb(242, 242, 242);
	padding-left: 20px;
	height: $settingHeight;
	box-shadow: 0px 2px 4px 0px #c1c1c1
}
</style>
