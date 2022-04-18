<template>
	<div class="main-topRight">
		<div :class="{ searchInputIsFocuse: state.inputFocus, plugin: true, search: true }">
			<el-icon @click="useSearch">
				<search />
			</el-icon>
			<el-input ref="searchInput" :style="{ width: state.inputWidth + 'px' }" v-model="state.input"
				placeholder="内容搜索" @blur="inputBlur" clearable />
		</div>

		<div class="plugin">
			<el-icon>
				<message />
			</el-icon>
		</div>

		<div class="plugin" @click="toggle">
			<el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom" effect="dark">
				<el-icon>
					<full-screen />
				</el-icon>
			</el-tooltip>
		</div>

		<div class="plugin">
			<el-icon>
				<lock />
			</el-icon>
		</div>

		<div class="plugin">
			<el-dropdown trigger="click" popper-class="topRight">
				<span class="el-dropdown-link">
					<!-- https://pica.zhimg.com/v2-ebbc55687b5760ab321d4f0190e014dc_xl.jpg?source=32738c0c -->
					<!-- https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80 -->
					<el-avatar shape="square" :size="40"
						src="https://pica.zhimg.com/v2-ebbc55687b5760ab321d4f0190e014dc_xl.jpg?source=32738c0c" />

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
import { reactive, ref } from 'vue'
const { isFullscreen, toggle } = useFullscreen()

let searchInput = ref(null)

const state = reactive({
	input: '',
	inputWidth: 0,
	inputFocus: false,
})

const useSearch = () => {
	state.inputFocus = !state.inputFocus

	if (state.inputFocus) {
		state.inputWidth = 200
			; (searchInput.value as any).focus()
	}
}
const inputBlur = () => {
	state.inputWidth = 0
	state.inputFocus = false
}
</script>
<style scoped lang="scss">
.main-topRight {
	display: flex;
	height: 50px;
	justify-content: flex-end;
	align-items: center;
}

.plugin {
	&:hover {
		cursor: pointer;
	}

	&+.plugin {
		margin-left: 10px;
		margin-right: 10px;
	}
}

.el-avatar {
	border-radius: 10px;
}

.plugin.search {
	display: flex;
	justify-content: start;
	align-items: center;
	margin-right: 10px;

	& :deep(.el-input) {
		transition: width 0.3s ease;
	}

	& :deep(.el-input__inner) {
		box-shadow: unset;
		border-radius: 0px;

		&:hover {
			box-shadow: unset;
		}
	}
}

.searchInputIsFocuse {
	box-shadow: 0 1px 0 0 #dcdfe6;
}
</style>
