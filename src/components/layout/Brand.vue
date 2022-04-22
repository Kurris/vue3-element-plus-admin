<template>
    <!--  -->
    <div class="brand" :class="{ widthS: navStore.isCollapse, widthL: !navStore.isCollapse }">
        Brand
        <span v-show="!navStore.isCollapse">
            :vue3-elementPlus-admin
        </span>
    </div>
</template>
<script lang="ts" setup>
import { useNavStore } from '@/stores/frameworkStore';


const navStore = useNavStore()

</script>
<style lang="scss" scoped>
.brand {
    display: flex;
    justify-content: center;
    height: var(--header-height);
    background-color: #04699d;
    line-height: var(--header-height);
    color: white;
    box-shadow: 0px 1px 4px 0px #c1c1c1;
    width: 285px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}

.widthS {
    width: 64px;
}

.widthL {
    width: 285px;
}
</style>
