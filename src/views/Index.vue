<template>
    <div>
        <el-container ref="app">
            <div v-show="!navStore.isHidden">
                <brand></brand>
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
import nprogress from 'nprogress'

import { useNavStore, useTabStore } from '@/stores/frameworkStore'

const navStore = useNavStore()
const tabStore = useTabStore()

let state = reactive({
    compontIsShow: true,//用于处理刷新
})



const app = ref()

//VueUse:监控浏览器大小变化
useResizeObserver(app, entries => {
    const entry = entries[0]
    const { width } = entry.contentRect
    if (width <= 765) {
        navStore.isCollapse = true
    }

    navStore.isHidden = width <= 500
    tabStore.isHidden = width <= 500
})


/**刷新当前路由*/
const reload = async () => {
    //显示进度条
    nprogress.start()
    state.compontIsShow = false

    //等待渲染再设置为true
    await nextTick(() => {
        nprogress.done()
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
