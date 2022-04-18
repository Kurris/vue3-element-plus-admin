import http from '../http'
import testRequest from '../type/test/testRequest'
import testResponse from '../type/test/testResponse'

export const test = (params: testRequest) => {
	return http<Array<testResponse>>({
		url: 'weatherforecast',
		method: 'get',
		params: params,
	})
}
