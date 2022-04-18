import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import BaseResponse from './type/BaseResponse'

const requestFunction = <TUserResponse>(config: AxiosRequestConfig): AxiosPromise<BaseResponse<TUserResponse>> => {
	const instance = axios.create()

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
				//业务状态处理
				return result
			}
		},
		error => {
			NProgress.done()

			//网络异常
			if (error.message == 'Network Error') {
			} else if (error.response.status != 200) {
				//
				if (error.response.status == 400) {
				} else {
				}
			}
			return error
		}
	)

	return instance(config)
}

export default requestFunction
