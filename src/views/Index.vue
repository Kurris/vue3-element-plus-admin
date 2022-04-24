<template>
    <div>
        <el-container ref="app">
            <div v-show="!navStore.isHidden">
                <!-- <brand></brand> -->
                <nav-bar />
            </div>

            <el-container>
                <el-header>
                    <header-bar />
                </el-header>

                <tab-bar @reload="reload" v-show="!tabStore.isHidden" />
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

import { useNavStore, useTabStore } from '@/stores/frameworkStore'

let state = reactive({
    compontIsShow: true,//刷新
})

const navStore = useNavStore()
const tabStore = useTabStore()

const app = ref()

useResizeObserver(app, entries => {
    const entry = entries[0]
    const { width } = entry.contentRect
    if (width <= 765) {
        navStore.isCollapse = true
    }

    navStore.isHidden = width <= 500
    tabStore.isHidden = width <= 500
})

const reload = async () => {
    state.compontIsShow = false

    //等待渲染再设置为true
    await nextTick(() => {
        state.compontIsShow = true
    })
}

</script>

<style lang="scss" scoped>
.el-main {
    height: calc(100vh - 100px);
    overflow-x: hidden;
}

.el-header {
    height: var(--header-height) !important;
    padding: 0 !important;
}
</style>
