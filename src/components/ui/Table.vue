<template>
    <el-empty v-if="total == 0" description="暂无数据" />
    <div v-else>
        <el-table :row-key="rowKey" :data="data" :stripe="stripe" :border="border" highlight-current-row
            v-loading="isLoading" :header-cell-style="headerCellStyle || {
                'background-color': '#eef1f6', color: '#606266', fontWeight: 'bold'
            }" @current-change="rowChange" @cell-contextmenu="cellContextmenu" @cell-dblclick="cellDbClick">


            <!-- <el-table-column type="index" label="行" /> -->
            <!-- 可显示的 -->
            <template v-for="item in columns.filter(x => x.visiable == undefined || x.visiable || x.visiable == null)">
                <!-- 非自定义 -->
                <template v-if="item.slotName">
                    <el-table-column :fixed="item.fixed" :label="item.lable" :align="item.align || 'center'"
                        :width="item.width">
                        <!-- 没有label才需要渲染header -->
                        <template #header v-if="!item.lable">
                            <slot :name="item.slotName + 'Header'"></slot>
                        </template>
                        <template #default="scope">
                            <slot :name="item.slotName" :scope="scope"></slot>
                        </template>
                    </el-table-column>
                </template>
                <template v-else-if="item.editable">
                    <el-table-column :fixed="item.fixed" :label="item.lable" :align="item.align || 'center'"
                        :width="item.width" :prop="item.prop">
                        <template #header>
                            <div
                                :style="{ display: 'flex', alignItems: 'center', justifyContent: item.align || 'center' }">
                                <el-icon style="margin-right: 5px;">
                                    <EditPen />
                                </el-icon>
                                {{ item.lable }}
                            </div>
                        </template>
                        <template #default="scope">
                            <div v-if="editableMap.get(scope.row[rowKey] + '_' + item.prop!)" style="display: flex;">
                                <el-input v-model="scope.row[item.prop!]" />
                                <ConfirmOrCancel style="margin-top: 5px;" :confirm-option="{ tipText: '提交', }"
                                    :cancel-option="{
                                        showMsg: cellIsModified(scope.row[item.prop!], editableBeforeValueMap.get(scope.row[rowKey] + '_' + item.prop!) || ''),
                                        tipText: '取消', messageBox: {
                                            isHtml: true,
                                            title: '提醒',
                                            content: `单元格值已被修改,是否放弃修改?<br>原值:${editableBeforeValueMap.get(scope.row[rowKey] + '_' + item.prop!)}<br>修改:${scope.row[item.prop!]}`,
                                            confirmButtonText: '取消',
                                            cancelButtonText: '关闭',
                                            type: 'warning'
                                        }
                                    }" @confirm="cellConfirmBtn(scope.row[rowKey], item.prop!, scope.row)"
                                    @cancel="cellCancelBtn(scope.row[rowKey], item.prop!, scope.row)" />
                            </div>
                            <div v-else>
                                {{ scope.row[item.prop!] }}
                            </div>
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column :fixed="item.fixed" :prop="item.prop" :label="item.lable"
                        :align="item.align || 'center'" :width="item.width" />
                </template>
            </template>
        </el-table>
        <Pagination :load="load" :total="total" />
    </div>

</template>
<script lang="ts" setup>
import { ref, onBeforeMount, nextTick, CSSProperties } from 'vue';
import { IColumn, IPaginationResponse } from './Type'
import Pagination from './Pagination.vue'
import http from '../../net/http';
import ConfirmOrCancel from './ConfirmOrCancel.vue'
import Sortable from 'sortablejs';


const props = withDefaults(defineProps<{
    /** 表格行的唯一标识 */
    rowKey: string

    /** 表格列 */
    columns: IColumn[]

    /** 请求地址 */
    requestUrl: string,

    /**请求参数*/
    requestBody?: object,

    /**
     * 标题样式 
     * @type {CSSProperties}
    */
    headerCellStyle?: CSSProperties,

    /** 斑马线*/
    stripe?: boolean,

    /** 边框 */
    border?: boolean

    /** 是否为可拖拽行 */
    rowDrag?: boolean
}>(), {
    // headerCellStyle:,
    stripe: true,
    border: true,
    rowDrag: false
})



const data = ref(Array<any>())//表格数据
const total = ref(0)//表格数据总数
const isLoading = ref(false)//loading显示

/**编辑中的单元格*/
const editableMap = ref(new Map<string, boolean>())
/**编辑中的单元格原始值*/
const editableBeforeValueMap = ref(new Map<string, string>())

const emits = defineEmits<{
    (e: 'rowChange', row: any, oldRow: any): void
    (e: 'cellEditConfirm', row: any, prop: string, oldValue: any, newValue: any): Promise<void>
}>()



/**
 * 表格选中行切换
 * 
 * @param row 当前行
 * @param oldRow 上一行
 * 
*/
const rowChange = (row: any, oldRow: any) => emits('rowChange', row, oldRow)


/**
 * 单元格右键
 * 
 * @param row 单元格所在行
 * @param column 单元格所在列
 * @param cell 当前单元格
 * @param event 右键事件
 * 
*/
const cellContextmenu = (row: any, column: any, cell: any, event: PointerEvent) => {
    // event.preventDefault()
}

/**
 * 单元格双击启用编辑
 * 
 * @param row 行
 * @param column 列
 * @param event 点击事件
 * 
*/
const cellDbClick = (row: any, column: any, _: any) => {
    const key = row[props.rowKey]
    let col = props.columns[column.no]

    if (!col) return
    if (col.editable != undefined && col.editable == false) return

    let mapKey = key + '_' + col.prop!
    console.log(mapKey);


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

/**
 * 单元格取消编辑
 * 
 * @param keyData 主键值
 * @param prop 属性名称
 * @param row 单元格所在行值
 * 
*/
const cellCancelBtn = (keyData: object, prop: string, row: any) => {
    const key = keyData + '_' + prop
    const beforeValue = editableBeforeValueMap.value.get(key)
    editableBeforeValueMap.value.delete(key)
    row[prop] = beforeValue
    editableMap.value.set(key, false)
}

/**
 * 单元格修改保存
 * 
 * @param keyData 主键值
 * @param prop 属性名称
 * @param row 单元格所在行值
 * 
 * @returns Promise{void}
*/
const cellConfirmBtn = async (keyData: object, prop: string, row: any) => {
    const key = keyData + '_' + prop
    const beforeValue = editableBeforeValueMap.value.get(key)

    try {
        await emits('cellEditConfirm', row, prop, beforeValue, row[prop])

        editableBeforeValueMap.value.delete(key)
        editableMap.value.set(key, false)
    } catch (error) {
    }
}

/**
 * 检查单元格值是否已被修改
 * 
 * @param currentValue 主键值
 * @param beforeValue 属性名称
 * 
 * @returns boolean 已修改:true
*/
const cellIsModified = (currentValue: string, beforeValue: string) => currentValue != beforeValue


/**
 * 表格数据加载方法
 * 
 * @param pageIndex 当前页
 * @param pageSize 页码
 * 
 * @returns Promise{void}
*/
const load = async (pageIndex: number, pageSize: number) => {
    isLoading.value = true

    try {
        let pageResponse = await http<IPaginationResponse>({
            url: props.requestUrl,
            method: 'get',
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                condition: props.requestBody
            }
        })

        console.log(pageResponse);


        data.value = pageResponse.data.data || Array<any>()
        total.value = pageResponse.data.total || 0
    } catch (err) {
        console.log(err + '\r\n' + 'request url:' + props.requestUrl);
    } finally {
        isLoading.value = false
    }
}



onBeforeMount(async () => {
    await load(1, 20)

    if (props.rowDrag) {
        nextTick(() => {
            const el: HTMLElement = document.querySelector('.el-table__body-wrapper tbody')!
            if (el) {
                Sortable.create(el, {
                    disabled: false,
                    // animation: 150,
                    ghostClass: 'tbbgc',
                    onEnd({ newIndex, oldIndex }) {
                        const currRow = data.value.splice(oldIndex!, 1)[0];
                        data.value.splice(newIndex!, 0, currRow);
                    },
                });
            }
        })
    }
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