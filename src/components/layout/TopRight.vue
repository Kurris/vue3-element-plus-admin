<template>
	<div class="main-topRight">

		<div v-show="!navStore.isHidden" class="main-topRight">
			<search />
			<message />
			<fullscreen />
			<lock />
		</div>

		<avatar />
	</div>
</template>

<script setup lang="ts">

import Message from './TopRightPlugin/Message.vue'
import Fullscreen from './TopRightPlugin/Fullscreen.vue'
import Search from './TopRightPlugin/Search.vue';
import Avatar from './TopRightPlugin/Avatar.vue';
import Lock from './TopRightPlugin/Lock.vue';
import { useNavStore } from '@/stores/frameworkStore';

const navStore = useNavStore()


</script>
<style scoped lang="scss">
.main-topRight {
	display: flex;
	height: var(--header-height);
	justify-content: flex-end;
	align-items: center;
}
</style>
