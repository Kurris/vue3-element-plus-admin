<template>
    <div class="plugin">
        <el-dropdown trigger="click" popper-class="topRight" @command="avatarCommand">
            <span class="el-dropdown-link">
                <el-avatar shape="square" :size="40" :src="userProfile?.picture" />
                <el-icon style="margin-left: 10px">
                    <caret-bottom />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <template #default>
                            <el-button text>登录为: {{ userProfile?.family_name }}{{ userProfile?.given_name }}</el-button>
                        </template>
                    </el-dropdown-item>
                    <el-dropdown-item command="dashboard" :disabled="$route.path == '/index/dashboard'">首页
                    </el-dropdown-item>
                    <el-dropdown-item command="myzoom" :disabled="$route.path == '/index/myzoom'">个人中心
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
import { onBeforeMount, ref } from 'vue';
import { Profile } from 'oidc-client';

const router = useRouter()
let userProfile = ref<Profile>()

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

onBeforeMount(async () => {
    let user = await userSignInManager.getUser()
    userProfile.value = user?.profile;
    console.log(userProfile.value);

})

</script>
<style lang="scss" scoped>
.el-avatar {
    border-radius: 8px;
}
</style>