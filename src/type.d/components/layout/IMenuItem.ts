declare interface IMenuItem {
	displayName: string
	route: string
	icon: string
	visiable?: boolean
	children: IMenuItem[]
}

export default IMenuItem
