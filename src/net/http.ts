import { AxiosRequestConfig } from 'axios'
import requestFunction from './index'

export default async <TUserResponse>(config: AxiosRequestConfig): Promise<TUserResponse> => {
	config.timeout = 30 * 1000 //30sec
	config.baseURL = 'https://localhost:5001'

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
