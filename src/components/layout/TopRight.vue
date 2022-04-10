<template>
	<div class="main-topRight">
		<div class="plugin">
			<el-icon><search /></el-icon>
		</div>

		<div class="plugin">
			<el-icon><message /></el-icon>
		</div>

		<div class="plugin">
			<el-icon><full-screen /></el-icon>
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

<script setup lang="ts"></script>
<style scoped lang="scss">
.main-topRight {
	display: flex;
	margin-left: auto;
	margin-right: 20px;
	height: 50px;
	width: 200px;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;

	>>> .el-dropdown__popper {
		margin-left: -30px !important;
	}
}

.plugin {
	&:hover {
		cursor: pointer;
	}
}

.el-avatar {
	border-radius: 10px;
}
</style>
