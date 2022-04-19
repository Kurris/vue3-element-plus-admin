<template>
    <div class="plugin" @click="toggle">
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom" effect="dark">
            <el-icon>
                <full-screen />
            </el-icon>
        </el-tooltip>
    </div>
</template>
<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>
<style lang="scss" scoped>
</style>