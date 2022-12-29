<template>
    <div id="myZoom">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <el-card style="height: 500px;" :style="{ marginBottom: '20px' }">
                    <template #header>
                        标题
                    </template>
                </el-card>
            </el-col>

            <el-col :span="18" :xs="24">
                <el-card>
                    <el-tabs v-model="activeTab" class="demo-tabs">
                        <el-tab-pane label="Activity" name="activity"></el-tab-pane>
                        <el-tab-pane label="Timeline" name="timeline"></el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>

        </el-row>
    </div>
</template>
<script lang="ts" >

export default {
    name: 'myzoom'
}
</script>
<script lang="ts" setup>

import { ref } from 'vue';
const activeTab = ref('first')

</script>
<style lang="scss" scoped>

</style>