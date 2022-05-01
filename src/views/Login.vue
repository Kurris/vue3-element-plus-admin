<template>
    <div id="loginContainer">

        <div class="content">
            <span style="font-size: 20px;"><b>Login</b>
                <el-avatar class="avatar"
                    src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
                </el-avatar>
            </span>

            <el-form style="margin-top: 20px;" label-position="top" size="large">
                <el-form-item label="Email address">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <template #label>
                        <span>Password</span>
                        <el-link style="float: right;">
                            Forgot Password?
                        </el-link>
                    </template>
                    <template #default>
                        <el-input></el-input>
                    </template>
                </el-form-item>
                <el-form-item>
                    <el-checkbox>Remember Me</el-checkbox>
                    <el-button type="primary">Login</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="footer">
            Dont't have an account? <el-link style="margin-left: 10px;">Create One</el-link>
        </div>

        <div class="company">
            Copyright ©️ 2022-{{ currentYear }} —— Ligy
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';



const currentYear = ref(new Date().getFullYear())
</script>
<style lang="scss" scoped>
#loginContainer {
    position: absolute;
    width: 380px;
    height: 415px;
    border-radius: 10px;
    box-shadow: 0 8px 15px 8px rgb(0 21 41 / 8%);

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 84px;
        width: 84px;
        top: calc(-84px /2);
    }

    .content {
        padding: 50px;
    }

    :deep() {
        .el-form-item__content {
            justify-content: space-between !important;
        }
    }

    .el-link {
        color: var(--el-link-hover-text-color);
        content: "";
        border-bottom: 1px solid var(--el-link-hover-text-color);

        &:after {
            border-bottom: unset
        }
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 50px;
        background-color: #f7f7f7;
    }

    .company {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0px;
        width: 100%;
        color: #808488;
        font-size: 18px;
        bottom: -80px;
    }
}
</style>    