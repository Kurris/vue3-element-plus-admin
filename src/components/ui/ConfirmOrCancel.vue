<template>
    <div class="coc">
        <el-icon color="#04699d" :size="20" @click="$emit('confirm')">
            <circle-check />
        </el-icon>
        <el-icon color="#ffc833" :size="20" @click="$emit('cancel')">
            <circle-close />
        </el-icon>
    </div>
</template>
 <script lang="ts">
export default {
    name: ''
}
</script>
<script setup lang="ts">

defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

</script>
<style scoped lang="scss">
.coc {
    display: flex;
}

.el-icon {
    margin-left: 5px;
}


.el-icon {
    :hover {
        cursor: pointer;
    }
}
</style>