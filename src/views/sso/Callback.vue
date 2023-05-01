<template>
	<div class="tip">
		<template v-if="stateError.isError === true">
			<h2>重定向似乎出现了问题: {{ stateError.message }}</h2>
		</template>
		<template v-else>
			<h2>正在重定向到系统,请稍等
				{{ dots }}
			</h2>
		</template>
	</div>

</template>
<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userCallbackManager } from '@/lib/oidclib'

const router = useRouter()
const dots = ref(' .')
const dotCount = ref(1)
let timer: any = null;
const stateError = ref({
	isError: false,
	message: ''
})

onBeforeMount(() => {

	userCallbackManager.signinRedirectCallback().then(user => {
		if (user) {
			// router.push({
			// 	path: '/index/dashboard',
			// })
			window.location = user.state;
		}
	}).catch(err => {
		clearInterval(timer)
		stateError.value.isError = true
		stateError.value.message = err
	})

	timer = setInterval(() => {

		if (dotCount.value == 8) {
			dotCount.value = 1
			dots.value = ' .'
			return
		}

		dots.value += ' .'

		dotCount.value++
	}, 1000);
})

onBeforeUnmount(() => {
	clearInterval(timer)
})


</script>
<style lang="scss" scoped>
.tip {
	display: flex;
	justify-content: center;
}
</style>
