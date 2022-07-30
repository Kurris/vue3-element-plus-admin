<template></template>
<script lang="ts" setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
	console.log('loggouted: call by identityserver iframe page')
	//todo: save other key
	localStorage.clear()
})
</script>
<style lang="scss" scoped>
</style>
