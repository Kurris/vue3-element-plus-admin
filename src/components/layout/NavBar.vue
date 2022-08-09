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
		<!-- <el-button v-if="!navStore.isCollapse"
			style="border-radius: 30px;margin-left: 50px;transition: all 0.3s ease-in-out;" text="plain">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag"
				viewBox="0 0 16 16">
				<path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
				<path
					d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
			</svg>
			<span>v0.0.1</span>
		</el-button> -->
	</div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue';
import MenuTree from './MenuTree.vue'
import { IMenuItem } from '@type/components/layout/IMenuItem'
import http from '@/net/http';
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

// var(--header-height)
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
