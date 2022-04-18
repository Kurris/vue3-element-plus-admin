interface BaseResponse<T> {
	data: T
	status: Number
	message: String
}

export default BaseResponse
