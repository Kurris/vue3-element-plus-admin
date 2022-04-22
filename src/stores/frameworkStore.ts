import { defineStore } from 'pinia'
import { IMenuItem } from '@/type.d/components/layout/IMenuItem'

export const useNavStore = defineStore('navStore', {
	state: () => {
		return {
			isCollapse: false,
			items: Array<IMenuItem>(),
		}
	},
})

export const useHeaderStore = defineStore('headerStore', {
	state: () => {
		return {
			setBreads: (path: string) => {},
		}
	},
})
