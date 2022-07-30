<template>
    <div :class="{ searchInputIsFocuse: state.inputFocus, plugin: true, search: true }">
        <el-icon @click="useSearch">
            <search />
        </el-icon>
        <el-input ref="searchInput" :style="{ width: state.inputWidth + 'px' }" v-model="state.input" placeholder="内容搜索"
            @blur="inputBlur" clearable />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';

let searchInput = ref(null)

const state = reactive({
    input: '',
    inputWidth: 0,
    inputFocus: false,
})

const useSearch = () => {
    state.inputFocus = !state.inputFocus

    if (state.inputFocus) {
        state.inputWidth = 200
            ; (searchInput.value as any).focus()
    }
}
const inputBlur = () => {
    state.inputWidth = 0
    state.inputFocus = false
}


</script>
<style lang="scss" scoped>
.searchInputIsFocuse {
    box-shadow: 0 1px 0 0 #dcdfe6;
}

.search {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-right: 10px;

    & :deep(.el-input) {
        transition: width 0.3s ease;
    }

    & :deep(.el-input__wrapper) {
        box-shadow: unset;
        border-radius: 0px;

        &:hover {
            box-shadow: unset;
        }
    }
}
</style>