<template>
    <el-empty v-if="total == 0" description="暂无数据" />
    <div v-else>
        <el-table :row-key="rowKey" :data="data" :stripe="stripe || true" :border="border || true" highlight-current-row
            v-loading="loading"
            :header-cell-style="headerCellStyle || { backgroundColor: '#eef1f6', color: '#606266', fontWeight: 'bold' }"
            @current-change="rowChange" @cell-contextmenu="cellContextmenu" @cell-dblclick="cellDbClick">

            <!-- 可显示的 -->
            <template v-for="item in columns.filter(x => x.visiable == undefined || x.visiable || x.visiable == null)">
                <template v-if="!item.slotName && !item.editable">
                    <el-table-column :fixed="item.fixed" :prop="item.prop" :label="item.lable"
                        :align="item.align || 'center'" />
                </template>
                <template v-else-if="!item.slotName && item.editable">
                    <el-table-column :fixed="item.fixed" :prop="item.prop" :label="item.lable"
                        :align="item.align || 'center'">
                        <template #default="scope">
                            <div v-if="editableMap.get(scope.row[rowKey] + '_' + item.prop!)" style="display: flex;">
                                <el-input v-model="scope.row[item.prop!]" />

                                <!-- <el-button color="#ffc833" size="small" class="cancelBtn"
                                    @click="cancelBtn(scope.row[rowKey], item.prop!, scope.row)">取消
                                </el-button> -->
                                <ConfirmOrCancel style="margin-top: 5px;" />
                            </div>
                            <div v-else>
                                {{ scope.row[item.prop!] }}
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column :fixed="item.fixed" :label="item.lable" :align="item.align || 'center'">
                        <!-- 没有lable才需要渲染header -->
                        <template #header v-if="!item.lable">
                            <slot :name="item.slotName + 'Header'"></slot>
                        </template>
                        <template #default="scope">
                            <slot :name="item.slotName" :scope="scope"></slot>
                        </template>
                    </el-table-column>
                </template>
            </template>

        </el-table>
        <Pagination :load="load" :total="total" />
    </div>

</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import { IColumn, IPaginationResponse } from './Type'
import Pagination from './Pagination.vue'
import http from '../../net/http';
import ConfirmOrCancel from './ConfirmOrCancel.vue'


const props = defineProps<{


    /**
     * 表格行的唯一标识
     */
    rowKey: string


    /**
     * 表格列
     */
    columns: IColumn[]

    /**
     * 请求地址
    */
    requestUrl: string,

    /**
     * 请求参数
    */
    requestBody?: object,

    /**
     * 标题样式 
     * @type {CSSProperty}
    */
    headerCellStyle?: object,

    /**
     * 斑马线
    */
    stripe?: boolean,

    /**
     * 边框
    */
    border?: boolean
}>()

const data = ref(Array<any>())
const total = ref(0)
const loading = ref(false)
const editableMap = ref(new Map<string, boolean>())
const editableBeforeValueMap = ref(new Map<string, object>())

const emits = defineEmits<{
    (e: 'rowChange', row: any, oldRow: any): void
}>()



/**
 * 选中行改变
 */
const rowChange = (row: any, oldRow: any) => emits('rowChange', row, oldRow)
const cellContextmenu = (row: any, column: any, cell: any, event: PointerEvent) => {
    event.preventDefault()
}

const cellDbClick = (row: any, column: any, _: any, event: PointerEvent) => {
    const key = row[props.rowKey]
    let col = props.columns[column.no]

    if (!col) return
    if (!col.editable) return

    let mapKey = key + '_' + col.prop!

    if (!editableMap.value.has(mapKey)) {
        editableMap.value.set(mapKey, true)
    } else {
        let editable = editableMap.value.get(mapKey)
        if (!editable) {
            editableMap.value.set(mapKey, true)
        }
    }

    editableBeforeValueMap.value.set(mapKey, row[column.property])
}

const cancelBtn = (keyData: object, prop: string, row: any) => {
    const key = keyData + '_' + prop
    const beforeValue = editableBeforeValueMap.value.get(key)
    editableBeforeValueMap.value.delete(key)
    row[prop] = beforeValue
    editableMap.value.set(key, false)
}

const load = async (pageIndex: number, pageSize: number) => {
    loading.value = true

    try {
        let pageResponse = await http<IPaginationResponse>({
            useNotify: false,
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
    } catch (err) {
        console.log(err + '\r\n' + 'request url:' + props.requestUrl);
    } finally {
        loading.value = false
    }
}

onBeforeMount(async () => {
    await load(1, 10)
})

</script>
<style lang="scss" scoped>
.cancelBtn {
    margin-left: 10px;
    margin-top: 2.5px;
    color: white;
    font-size: 10px;
}
</style>