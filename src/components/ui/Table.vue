<template>
    <!-- stripe -->
    <!-- border -->

    <el-empty v-if="total == 0" description="暂无数据" />
    <div v-else>
        <el-table :data="data" stripe highlight-current-row v-loading="loading"
            :header-cell-style="headerCellStyle || { backgroundColor: '#eef1f6', color: '#606266', fontWeight: 'bold' }"
            @current-change="rowChange">
            <template v-for="item in columns">
                <el-table-column v-if="!item.slotName" :fixed="item.fixed" :prop="item.prop" :label="item.lable"
                    :align="item.align || 'center'"></el-table-column>

                <el-table-column v-else :fixed="item.fixed" :label="item.lable" :align="item.align || 'center'">
                    <!-- 没有lable才需要渲染header -->
                    <template #header v-if="!item.lable">
                        <slot :name="item.slotName + 'Header'"></slot>
                    </template>
                    <template #default="scope">
                        <slot :name="item.slotName" :scope="scope"></slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div style="display: flex;justify-content: space-around;margin-top: 24px;">
            <Pagination :load="load" :total="total"></Pagination>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { IColumn, IPaginationResponse } from './Type'
import Pagination from './Pagination.vue'
import http from '../../net/http';

const props = defineProps<{
    columns: IColumn[]
    requestUrl: string,
    requestBody?: any,
    headerCellStyle?: object
}>()

const data = ref(Array<any>())
const total = ref(0)
const loading = ref(false)

defineEmits<{
    (e: 'rowChange', row: any, oldRow: any): void
}>()


/**
 * 选中行改变
 */
const rowChange = (row: any, oldRow: any) => rowChange(row, oldRow)

const load = async (pageIndex: number, pageSize: number) => {
    loading.value = true

    try {
        let pageResponse = await http<IPaginationResponse>({
            url: props.requestUrl,
            method: 'post',
            data: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                condition: props.requestBody
            }
        })


        data.value = pageResponse.data || Array<any>()
        total.value = pageResponse.total || 0
    } finally {
        loading.value = false
    }
}

onBeforeMount(async () => {
    await load(1, 10)
})

</script>
<style lang="ts" scoped>


</style>