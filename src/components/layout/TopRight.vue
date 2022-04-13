<template>
	<div class="main-topRight">
		<div class="plugin search">
			<el-icon><search /></el-icon>
			<el-input v-model="state.input" placeholder="内容搜索" clearable />
		</div>

		<div class="plugin">
			<el-icon><message /></el-icon>
		</div>

		<div class="plugin" @click="toggle">
			<el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom" effect="dark">
				<el-icon><full-screen /></el-icon>
			</el-tooltip>
		</div>

		<div class="plugin">
			<el-icon><lock /></el-icon>
		</div>

		<div class="plugin">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					<el-avatar shape="square" :size="40" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" />

					<el-icon style="margin-left: 10px">
						<caret-bottom />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="personalZoom">个人中心</el-dropdown-item>
						<el-dropdown-item command="dashboard">首页</el-dropdown-item>
						<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import { reactive } from 'vue'
const { isFullscreen, toggle } = useFullscreen()

const state = reactive({
	input: '',
})
</script>
<style scoped lang="scss">
.main-topRight {
	display: flex;
	height: 50px;
	justify-content: flex-end;
	align-items: center;

	>>> .el-dropdown__popper {
		margin-left: -30px !important;
	}
}

.plugin {
	&:hover {
		cursor: pointer;
	}
	& + .plugin {
		margin-left: 10px;
		margin-right: 10px;
	}
}

.el-avatar {
	border-radius: 10px;
}

.plugin.search {
	.el-input {
		display: none;
		width: 100px;
	}
}
</style>
