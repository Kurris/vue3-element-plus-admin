<template>
    <div class="page">
        <el-pagination :disabled="disabled" small background v-model:currentPage="currentPage"
            v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue';

const props = defineProps<{
    total: number
    load: (index: number, size: number) => Promise<void>
}>()

const currentPage = ref(1)
const pageSize = ref(20)
const disabled = ref(false)

const load = () => {
    return props.load(currentPage.value, pageSize.value)
}

const handleSizeChange = async (val: number) => {
    pageSize.value = val
    disabled.value = true
    await load()
    disabled.value = false
}
const handleCurrentChange = async (val: number) => {
    currentPage.value = val
    disabled.value = true
    await load()
    disabled.value = false
}
</script>

<style scoped lang="scss">
.page {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
}
</style>