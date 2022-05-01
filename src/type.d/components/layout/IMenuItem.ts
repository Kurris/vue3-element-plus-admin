export interface IMenuItem {
	displayName: string
	route: string
	icon: string
	visible: boolean
	children: IMenuItem[]
}
