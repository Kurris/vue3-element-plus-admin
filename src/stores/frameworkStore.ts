import { defineStore } from 'pinia'
import { IMenuItem } from '@/type.d/components/layout/IMenuItem'

export const useNavStore = defineStore('navStore', {
	state: () => {
		return {
			/**是否显示navbar*/
			isHidden: false,
			/**是否折叠*/
			isCollapse: false,
			/**菜单数据源*/
			items: Array<IMenuItem>(),
			/**菜单点击水波纹效果*/
			useRipple: false,
		}
	},
	actions: {
		Ripple(event: MouseEvent) {
			if (!this.useRipple) return

			let el: Element = event.target as Element
			// 找到item和header节点
			while (!((el.hasAttribute('role') && el.getAttribute('role') === 'menuitem' && el.classList.contains('el-menu-item')) || el.classList.contains('el-sub-menu__title'))) {
				el = el.parentElement!
			}
			if (el != undefined) {
				import('@/directive/Ripple').then(ripple => {
					ripple.default(el, event)
				})
			}
		},
	},
})

export const useHeaderStore = defineStore('headerStore', {
	state: () => {
		return {
			setBreads: (path: string) => {},
		}
	},
})

/**tabStore 处理*/
export const useTabStore = defineStore('tabStore', {
	state: () => {
		return {
			/**是否显示tab*/
			isHidden: false,
		}
	},
})
