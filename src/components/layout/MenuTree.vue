<template>
    <el-menu-item v-if="!item.children || !item.children.length" :index="item.route" v-ripple>
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
:deep() {
    .el-sub-menu__title {

        font-size: 14px !important;
        color: black !important;

        span,
        svg {
            color: #409eff;
        }
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