<template>
    <div class="plugin">
        <el-badge :is-dot="isDot" :value="120" :max="99" @mouseover="msgMouseEnter" @mouseleave="msgMouseLeave">
            <el-icon>
                <bell />
            </el-icon>
        </el-badge>
    </div>
</template>
<script lang="ts" setup>import { ref } from 'vue';

const isDot = ref(true)
const msgMouseEnter = () => {
    isDot.value = false
}
const msgMouseLeave = () => {
    isDot.value = true
}
</script>
<style lang="scss" scoped>
</style>