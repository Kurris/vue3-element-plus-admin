<template>
    <el-menu-item v-if="(!item.children || !item.children.length) && (item.visiable == null || item.visiable)"
        :index="item.route">
        <el-icon v-if="item.icon">
            <component :is="item.icon" />
        </el-icon>
        <span>{{ item.displayName }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="item.route" @click.stop="subMenuClick">
        <template #title v-if="item.icon">
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            <span>{{ item.displayName }}</span>
        </template>

        <template v-for="child in item.children">
            <menu-tree :item="child" />
        </template>

    </el-sub-menu>
</template>
 <script lang="ts">
import Ripple from '@/directive/Ripple'

export default {
    name: 'menuTree',
}
</script>
<script setup lang="ts">

defineProps<{
    item: any
}>()

const subMenuClick = (e: MouseEvent) => {
    let el = e.target as Element

    // 找到item和header节点
    while (!((el.hasAttribute("role") && el.getAttribute("role") === "menuitem") && el.classList.contains("el-menu-item")
        || el.classList.contains("el-sub-menu__title"))) {

        el = el.parentElement!
    }
    if (el != undefined) {
        Ripple(el, e)
    }
}

</script>
<style scoped lang="scss">
:deep(.el-sub-menu__title) {

    height: 40px;
    font-size: 14px !important;
    color: black !important;

    span,
    svg {
        color: #409eff;
    }
}

li {
    font-size: 14px;
    color: #bfcbd9;

    &.el-menu-item {
        border-radius: 5px;
        height: 40px;
        margin-left: 2px;
        margin-right: 2px;
        color: black;
        margin-bottom: 2px;

        &:hover {
            background-color: #f6f6f6 !important;
        }

        &.is-active {
            border-left: 2px solid #409eff;
            background-color: #e3edf8;
            color: #409eff;
        }
    }
}
</style>