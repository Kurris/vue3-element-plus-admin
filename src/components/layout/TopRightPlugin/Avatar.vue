<template>
    <div class="plugin">
        <el-dropdown trigger="click" popper-class="topRight" @command="avatarCommand">
            <span class="el-dropdown-link">
                <el-avatar shape="square" :size="40"
                    src="https://pica.zhimg.com/v2-ebbc55687b5760ab321d4f0190e014dc_xl.jpg?source=32738c0c" />

                <el-icon style="margin-left: 10px">
                    <caret-bottom />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="dashboard" :disabled="$route.path == '/index/dashboard'">首页
                    </el-dropdown-item>
                    <el-dropdown-item command="myzoom" :disabled="$route.path == '/index/myzoom'">个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="mysetting">设置
                    </el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { userSignInManager } from '@/lib/oidclib';


const router = useRouter()

const avatarCommand = (cmd: string) => {
    if (cmd == "myzoom") {
        router.push({
            path: '/index/myzoom'
        })
    } else if (cmd == "dashboard") {
        router.push({
            path: '/index/dashboard'
        })
    } else if (cmd === 'logout') {
        userSignInManager.signoutRedirect()
    }
}

</script>
<style lang="scss" scoped>
.el-avatar {
    border-radius: 8px;
}
</style>