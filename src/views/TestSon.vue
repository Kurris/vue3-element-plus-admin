<template>
	<div>son of test</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onActivated } from 'vue'

onBeforeMount(() => {
	console.log('mounted');
})

onActivated(() => console.log('actived'))
</script>
<style scoped lang="scss">
</style>
