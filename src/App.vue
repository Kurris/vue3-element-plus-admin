<template>
	<el-container>
		<el-aside :class="{ setAsideWidth: state.isCollapse }">
			<div style="height: 50px; background-color: #2b2f3a; line-height: 50px; padding-left: 10px; color: white">品牌</div>
			<nav-bar :isCollapse="state.isCollapse" />
		</el-aside>

		<el-container>
			<el-header>
				<header-bar
					@set-collapse="setCollapse"
					:breads="[
						{ name: 'ligy', path: '/test/son' },
						{ name: 'ligy', path: '/test/son' },
					]"
				/>
			</el-header>

			<tab-bar />
			<el-main>
				<!-- <router-link to="/test1">route link </router-link> -->
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/layout/NavBar.vue'
import HeaderBar from './components/layout/HeaderBar.vue'
import TabBar from './components/layout/TabBar.vue'

let state = reactive({
	isCollapse: false,
})

const route = useRoute()
console.log('route' + route)

const setCollapse = (isCollapse: boolean) => {
	state.isCollapse = isCollapse
}
</script>

<style lang="scss">
@use './styles/global.scss' as *;

.setAsideWidth {
	width: 65px !important;
}

.el-aside {
	overflow-y: hidden !important;

	:hover {
		overflow-y: auto !important;
	}
}
</style>
