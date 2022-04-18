/**@interface 接口基础返回值*/
interface BaseResponse<T> {
	/**@param data 范型返回值*/
	data: T

	/**@param status 状态码*/
	status: Number

	/**@param message 内容*/
	message: String
}

export default BaseResponse
