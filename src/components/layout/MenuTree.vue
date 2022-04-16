<template>
    <el-menu-item v-if="!item.children || !item.children.length" :index="item.route">
        <el-icon>
            <component :is="item.icon" />
        </el-icon>
        <span>{{ item.displayName }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="item.route">
        <template #title>
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
export default {
    name: 'menuTree',
}
</script>
<script setup lang="ts">

defineProps<{
    item: any
}>()

</script>
<style scoped lang="scss">
:deep(.el-sub-menu__title) {
    font-size: 14px !important;
    color: #bfcbd9 !important;
}

li {
    font-size: 14px;
    color: #bfcbd9;

    &.el-menu-item {
        &.is-active {
            border-right: 2px solid #409eff;
        }
    }
}
</style>