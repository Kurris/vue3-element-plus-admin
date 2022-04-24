<template>
    <div class="coc">

        <el-tooltip :visible="confirmOption != null && confirmVisible" effect="light" :content="confirmOption?.tipText"
            placement="bottom-end">
            <el-icon color="#04699d" :size="20" @click="confirm" @mouseenter="confirmVisible = true"
                @mouseleave="confirmVisible = false">
                <circle-check />
            </el-icon>
        </el-tooltip>

        <el-tooltip :visible="cancelOption != null && cancelVisible" effect="light" :content="cancelOption?.tipText"
            placement="bottom-end">
            <el-icon color="#ffc833" :size="20" @click="cancel" @mouseenter="cancelVisible = true"
                @mouseleave="cancelVisible = false">
                <circle-close />
            </el-icon>
        </el-tooltip>

    </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

import { ref } from 'vue';

const confirmVisible = ref(false)
const cancelVisible = ref(false)


interface IMessageBox {
    isHtml: boolean,
    title?: string,
    content: string,
    confirmButtonText: string
    cancelButtonText: string
    type: '' | 'success' | 'warning' | 'info' | 'error';
}

interface IOption {
    tipText: string
    showMsg?: boolean
    messageBox?: IMessageBox
}

const props = defineProps<{
    confirmOption?: IOption
    cancelOption?: IOption
}>()

const emits = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

const confirm = () => {
    const boxOption = props.confirmOption?.messageBox
    if (boxOption && props.confirmOption.showMsg) {
        ElMessageBox.confirm(
            boxOption.content,
            boxOption.title,
            {
                dangerouslyUseHTMLString: boxOption.isHtml,
                confirmButtonText: boxOption.confirmButtonText,
                cancelButtonText: boxOption.cancelButtonText,
                type: boxOption.type
            }
        ).then(_ => {
            emits('confirm')
        }).catch(_ => {

        })
    } else {
        emits('confirm')
    }
}


const cancel = () => {
    const boxOption = props.cancelOption?.messageBox
    if (boxOption && props.cancelOption.showMsg) {
        ElMessageBox.confirm(
            boxOption.content,
            boxOption.title,
            {
                dangerouslyUseHTMLString: boxOption.isHtml,
                confirmButtonText: boxOption.confirmButtonText,
                cancelButtonText: boxOption.cancelButtonText,
                type: boxOption.type
            }
        ).then(_ => {
            emits('cancel')
        }).catch(_ => {

        })
    } else {
        emits('cancel')
    }
}

</script>
<style scoped lang="scss">
.coc {
    display: flex;
}

.el-icon {
    margin-left: 5px;
    transition: all 0.3s ease;
}

.el-icon {
    svg {
        border-radius: 50px !important;
    }

    :hover {
        cursor: pointer;
        margin-bottom: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }
}
</style>