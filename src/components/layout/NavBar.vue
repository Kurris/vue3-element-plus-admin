<template>
	<div class="main-menu">
		<el-scrollbar>
			<!-- background-color="#304156" -->
			<el-menu :collapse="isCollapse" router :active-text-color="navActiveTextColor"
				:background-color="backgroundColor" :default-active="$route.path" text-color="white"
				class="el-menu-vertical" @select="select">
				<template v-for="item in items">
					<menu-tree :item="item" />
				</template>
				<li style="flex:1;"></li>
			</el-menu>

		</el-scrollbar>
		<!-- <div :class="{ setting: true, widthL: !isCollapse, widthS: isCollapse }">
			<el-icon>
				<setting />
			</el-icon>
		</div> -->
	</div>
</template>

<script lang="ts" setup>
import { ref, } from 'vue';
import MenuTree from './MenuTree.vue'
import { IMenuItem } from '@type/components/layout/IMenuItem'

defineProps<{
	isCollapse: boolean
	activeNavbar: string
	items: IMenuItem[]
}>()

const emits = defineEmits<{
	(e: 'selectIndex', indexPaths: string[]): void
}>()


const select = (_: string, indexPaths: string[]) => {
	emits('selectIndex', indexPaths)
}



// 获取根元素
var r = document.querySelector(':root')!;
//获取根的样式（属性和值）
var rs = getComputedStyle(r);
//获取指定的变量
let navBarColor = rs.getPropertyValue('--navbar-color')
let activeTextColor = rs.getPropertyValue('--active-text-color')

const backgroundColor = ref(navBarColor)
const navActiveTextColor = ref(activeTextColor)

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
	box-shadow: 0px 1px 2px 0px #c1c1c1
}

.widthL {
	width: 285px;
}

.widthS {
	width: 64px;
}

.setting {
	transition: all 0.3s ease-in-out;
	border-top: 1px solid whitesmoke;
	background-color: white;
	height: 64px;
	position: fixed;
	bottom: 0px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
}
</style>
