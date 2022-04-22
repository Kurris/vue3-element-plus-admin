<template>
    <div>
        <el-container ref="app">
            <div>
                <brand></brand>
                <nav-bar />
            </div>

            <el-container>
                <el-header>
                    <header-bar />
                </el-header>

                <tab-bar @reload="reload" />

                <el-main>
                    <el-config-provider :locale="zhCN">
                        <router-view v-slot="{ Component }">
                            <transition name="slide-fade" mode="out-in">
                                <keep-alive v-if="state.compontIsShow">
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </el-config-provider>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import { useResizeObserver } from '@vueuse/core'
import NavBar from '@c/layout/NavBar.vue'
import HeaderBar from '@c/layout/HeaderBar.vue'
import TabBar from '@c/layout/TabBar.vue'
import Brand from '../components/layout/Brand.vue'

import { useNavStore } from '@/stores/frameworkStore'

let state = reactive({
    compontIsShow: true,//刷新
})

const navStore = useNavStore()

const app = ref()

useResizeObserver(app, entries => {
    const entry = entries[0]
    const { width } = entry.contentRect
    if (width <= 750) {
        navStore.$state.isCollapse = true
    }
})

const reload = async () => {
    state.compontIsShow = false

    //等待渲染再设置为true
    await nextTick(() => {
        state.compontIsShow = true
    })
}

</script>

<style lang="scss" >
@use '@s/global.scss'as *;

.el-main {
    overflow: hidden !important;
}

.el-header {
    height: var(--header-height) !important;
    padding: 0 !important;
}
</style>
