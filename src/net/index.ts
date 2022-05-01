import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
import BaseResponse from './type/BaseResponse'
const router = useRouter()

export interface MyRequestConfig extends AxiosRequestConfig {
	/**
	 * 是否使用右上通知
	 */
	useNotify?: boolean
}

export const requestFunction = <TUserResponse>(config: MyRequestConfig): AxiosPromise<BaseResponse<TUserResponse>> => {
	const instance = axios.create()

	if (config.useNotify == null) {
		config.useNotify = true
	}

	instance.interceptors.request.use(config => {
		NProgress.start()
		return config
	})

	instance.interceptors.response.use(
		result => {
			NProgress.done()

			// 处理excel
			let contentType = result.headers['content-type']
			if (contentType && contentType.indexOf('application/json') < 0) {
				let a = document.createElement('a')
				document.body.append(a)

				let templateName = result.headers['content-disposition'].split(';')[1].split('filename=')[1]
				a.download = encodeURI(templateName)

				let blob = new Blob([result.data], {
					type: contentType,
				})

				a.href = URL.createObjectURL(blob)
				a.click()
				window.URL.createObjectURL(blob)
				document.body.removeChild(a)
			} else {
				console.log(result)

				//业务状态处理
				if (result.data.status == 401) {
					if (router.currentRoute.value.name != 'login') {
						router.push({
							path: 'login',
						})
					}
				}

				return result
			}
		},
		error => {
			NProgress.done()

			//网络异常
			if (error.message == 'Network Error') {
				ElNotification.error('网络异常')
			} else {
				if (error.response.status == 404) {
					ElNotification.error('请求接口不存在')
				}
			}

			return error
		}
	)

	return instance(config)
}
