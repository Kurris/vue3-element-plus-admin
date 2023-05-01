import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import BaseResponse from './type/BaseResponse'
import { userSignInManager } from '@/lib/oidclib'

export interface MyRequestConfig extends AxiosRequestConfig {
	/**
	 * 是否使用右上通知
	 */
	useNotify?: boolean
}

/**
 * 请求方法
 * @params <TUserResponse>(config: MyRequestConfig)
 * @return Promise<AxiosResponse<BaseResponse<TUserResponse>>>
 */
export const requestFunction = <TUserResponse>(config: MyRequestConfig): Promise<AxiosResponse<BaseResponse<TUserResponse>>> => {
	const instance = axios.create()

	if (config.useNotify == null) {
		config.useNotify = true
	}

	//请求开始
	instance.interceptors.request.use(config => {
		//启用加载条
		NProgress.start()
		return config
	})

	//请求响应(结束)
	instance.interceptors.response.use(
		result => {
			//加载条关闭(done 100%)
			NProgress.done()

			//处理文件流
			let contentType = result.headers['content-type']
			//如果非json
			if (contentType && contentType.indexOf('application/json') < 0) {
				let a = document.createElement('a')
				document.body.append(a)
				//获取文件名称
				let templateName = result.headers['content-disposition'].split(';')[1].split('filename=')[1]
				//转web code
				a.download = encodeURI(templateName)

				//二进制
				let blob = new Blob([result.data], {
					type: contentType,
				})

				//触发下载,并且移除<a>元素
				a.href = URL.createObjectURL(blob)
				a.click()
				window.URL.createObjectURL(blob)
				document.body.removeChild(a)
			} else {
				//业务状态处理
				let data = result.data as BaseResponse<TUserResponse>

				if (data.status == 500) {
					if (config.useNotify && config.useNotify == true) {
						ElMessage({
							type: 'error',
							message: data.message as any,
						})
					}
					throw data.message
				}

				return result
			}
		},
		async error => {
			NProgress.done()
			//网络异常
			if (error.message == 'Network Error') {
				ElMessage.error('网络异常,无法连接到服务端')
			} else {
				let result = error.response as AxiosResponse

				if (result.status == 401) {
					await userSignInManager.signinRedirect({ state: window.location.href })
				} else if (error.response.status == 404) {
					ElMessage({
						type: 'error',
						message: '请求接口不存在',
					})
				} else if (result.status == 500) {
					ElMessage({
						type: 'error',
						message: '服务器异常' + result.data?.message,
					})
				}
			}

			throw error
		}
	)
	//返回axios使用
	return instance(config)
}
