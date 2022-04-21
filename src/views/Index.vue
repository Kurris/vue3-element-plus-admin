<template>
    <div>
        <el-container ref="app">
            <div>
                <brand></brand>
                <nav-bar :isCollapse="state.isCollapse" :activeNavbar="state.activeTab" :items="state.navItems" />
            </div>

            <el-container>
                <el-header>
                    <header-bar @set-collapse="setCollapse" :breads="state.breads" :isCollapse="state.isCollapse" />
                </el-header>

                <tab-bar :tabItems="state.tabItems" :activeTab="state.activeTab" @tabChange="tabChange"
                    @tabRemove="tabRemove" @reload="reload" @tabRemoveAll="tabRemoveAll"
                    @tabRemoveCurrent="tabRemoveCurrent" @tabRemoveOther="tabRemoveOther" />
                <el-main>
                    <!-- <el-card style="height: 88vh;"> -->
                    <el-config-provider :locale="zhCN">
                        <router-view v-slot="{ Component }">
                            <transition name="slide-fade" mode="out-in">
                                <keep-alive v-if="state.compontIsShow">
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>
                    </el-config-provider>
                    <!-- </el-card> -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, watch, ref, onBeforeMount } from 'vue'
import { TabPanelName } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import { useResizeObserver } from '@vueuse/core'

import NavBar from '@c/layout/NavBar.vue'
import HeaderBar from '@c/layout/HeaderBar.vue'
import TabBar from '@c/layout/TabBar.vue'

import { AppRoute } from '../router/type'
import ITabItem from '@type/components/layout/ITabItem'
import { IMenuItem } from '@type/components/layout/IMenuItem'
import Brand from '../components/layout/Brand.vue'
import http from '@/net/http'

let state = reactive({
    isCollapse: false,//导航栏展开状态
    tabItems: Array<ITabItem>(...[
        {
            title: 'Dashboard',
            name: 'dashboard',
            path: '/index/dashboard',
            closable: false,
        },
    ]),//默认页签
    activeTab: 'dashboard',//默认选中的页签
    compontIsShow: true,//刷新
    breads: Array<string>(),//面包屑
    navItems: Array<IMenuItem>(...[
        {
            displayName: '首页',
            route: '首页',
            icon: 'home-filled',
            visiable: true,
            children: [
                {
                    displayName: 'Dashboard',
                    route: '/index/dashboard',
                    icon: '',
                    visiable: true,
                    children: [],
                },
                {
                    displayName: '个人中心',
                    route: '/index/myzoom',
                    icon: '',
                    visiable: true,
                    children: [],
                },
                {
                    displayName: '404',
                    route: '/index/404',
                    icon: '',
                    visiable: false,
                    children: [],
                }
            ],
        }
    ]),//导航栏数据,树状
})


const app = ref(null)

useResizeObserver(app, entries => {
    const entry = entries[0]
    const { width } = entry.contentRect
    if (width <= 750) {
        state.isCollapse = true
    }
})

const router = useRouter()

const reload = async () => {
    state.compontIsShow = false
    await nextTick(() => {
        state.compontIsShow = true
    })
}

watch(
    () => router.currentRoute.value,
    newValue => {
        console.log(newValue);

        let appRoute = newValue as any as AppRoute
        let existsItem = state.tabItems.find(x => x.name === appRoute.name)
        if (!existsItem) {
            existsItem = {
                title: appRoute.meta.title!,
                name: appRoute.name,
                path: appRoute.path,
                closable: true,
            }
            state.tabItems.push(existsItem)
        }
        state.activeTab = existsItem.name

        setBreads(existsItem.path)
    }
)

const setBreads = (path: string) => {
    let breads: string[] = findItem(path, state.navItems)
    state.breads = breads.reverse()
}

//note:链表反转算法
const findItem = (path: string, items: IMenuItem[]) => {
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (item.route == path) {
            return Array<string>(...[item.displayName])
        } else {
            if (item.children && item.children.length > 0) {
                let deepItems = findItem(path, item.children) as unknown as string[]
                if (deepItems && deepItems.length > 0) {
                    deepItems.push(item.displayName)
                    return deepItems
                }
            }
        }
    }
    return []
}

const setCollapse = (isCollapse: boolean) => {
    state.isCollapse = isCollapse
}

const tabChange = (activeTab: TabPanelName) => {
    state.activeTab = activeTab.toString()

    let existsItem = state.tabItems.find(x => x.name == state.activeTab)
    if (existsItem) {
        let path = existsItem.path
        router.push({
            path: path,
        })
    }
}

const tabRemove = (tab: TabPanelName) => {
    let i = state.tabItems.findIndex(x => x.name == tab.toString())
    if (i >= 0) {
        state.tabItems.splice(i, 1)
        if (state.tabItems.length <= i) {
            i--
        }
        state.activeTab = state.tabItems[i].name
    }
}

//页签操作
const tabRemoveOther = () => {
    let i = state.tabItems.findIndex(x => x.name == state.activeTab)
    //不是最后一个
    if (i != state.tabItems.length - 1) {
        state.tabItems.splice(i + 1, state.tabItems.length - 1 - i)
    }

    if (i != 0 && i != 1) {
        state.tabItems.splice(1, i - 1)
    }
}
const tabRemoveAll = () => {
    state.tabItems.splice(1, state.tabItems.length - 1)
    state.activeTab = state.tabItems[0].name
}
const tabRemoveCurrent = () => {
    let i = state.tabItems.findIndex(x => x.name == state.activeTab)
    if (i > 0) {
        let item = state.tabItems[i]
        if (item.closable) {
            state.tabItems.splice(i, 1)

            if (state.tabItems.length <= i) {
                i--
            }
            state.activeTab = state.tabItems[i].name
        }
    }
}

const route = useRoute()
onBeforeMount(async () => {
    try {
        let response = await http<Array<IMenuItem>>({
            useNotify: false,
            url: 'menus',
            method: 'get',
        });

        state.navItems = response
    } catch {

    }

    if (route.name == '404') {
        console.log(404);
        let existsItem = state.tabItems.find(x => x.name == '404')
        if (!existsItem) {
            existsItem = {
                title: '404',
                name: '404',
                path: '/index/404',
                closable: true,
            }
            state.tabItems.push(existsItem)
        }
        state.activeTab = existsItem.name
        setBreads('/index/404')
    } else {
        setBreads('/index/dashboard')
    }
})


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
