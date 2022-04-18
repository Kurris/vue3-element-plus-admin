<template>
	<div>
		test
	</div>
</template>

<script lang="ts">
export default {
	name: 'test',
}
</script>

<script setup lang="ts">
import { onBeforeMount, onActivated } from 'vue'

onBeforeMount(() => console.log('mounted'))

onActivated(() => console.log('actived'))

</script>

<style>
</style>
