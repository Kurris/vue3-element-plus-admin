import { requestFunction, MyRequestConfig } from './index'

export default async <TUserResponse>(config: MyRequestConfig): Promise<TUserResponse> => {
	config.timeout = 30 * 1000 //30sec
	config.baseURL = import.meta.env.VITE_HTTP_BASEURL as string

	return new Promise(async (resolve, reject) => {
		try {
			let result = await requestFunction<TUserResponse>(config)

			if (result.data != undefined) {
				return resolve(result.data.data)
			}

			throw result
		} catch (error) {
			return reject(error)
		}
	})
}
