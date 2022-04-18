<template>
    <div>
        test2
    </div>
</template>
 <script lang="ts">
export default {
    name: 'test2',
}
</script>
<script setup lang="ts">
import { onBeforeMount, onActivated } from 'vue'

onBeforeMount(() => console.log('mounted'))

onActivated(() => console.log('actived'))
</script>
<style scoped lang="scss">
</style>