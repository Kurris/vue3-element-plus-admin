declare interface IMenuItem {
	displayName: string
	route: string
	icon: string
	children: IMenuItem[]
}

export default IMenuItem
