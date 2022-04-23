export type align = 'left' | 'center' | 'right'

export type fixed = 'left' | 'right'

/**
 * element plus table列接口
 */
export interface IColumn {
	/**
	 * 标题
	 */
	lable?: string

	/**
	 * 对应后端字段名称
	 */
	prop?: string

	/**
	 * 显示位置
	 */
	align?: align

	/**
	 * 固定位置
	 */
	fixed?: fixed

	/**
	 * 插槽名称
	 */
	slotName?: string

	/**
	 * 是否可见
	 */
	visiable?: boolean

	/**
	 * 是否可编辑
	 */
	editable?: boolean
}

export interface IPaginationResponse {
	pageIndex: number
	pageSize: number
	total: number
	data: Array<any>
}
