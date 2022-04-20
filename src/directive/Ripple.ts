export default (el: any, e: MouseEvent) => {
	let x = e.clientX - el.offsetLeft
	let y = e.clientY - el.offsetTop

	//在鼠标位置增加一个span标签
	let span = document.createElement('span')
	span.style.position = 'absolute'
	span.style.backgroundColor = '#bacae8'
	span.style.opacity = '1'
	span.style.borderRadius = '50%'
	span.style.zIndex = el.style.zIndex
	span.style.maxWidth = el.offsetWidth
	span.style.maxHeight = el.offsetHeight

	el.style.overflow = 'hidden'
	el.append(span)
	let width = 0
	let height = 0
	let opacity: any = 1
	let max_length = Math.sqrt(el.offsetWidth * el.offsetWidth + el.offsetHeight * el.offsetHeight) * 2

	let time: any = setInterval(() => {
		width += 20
		height += 20
		opacity -= 0.02
		if (opacity <= 0) {
			clearInterval(time)
			time = null
			span.remove()
		} else {
			if (width < max_length) {
				//判断超出最大值时，清除定时，并且删除span
				span.style.width = width + 'px'
				span.style.height = height + 'px'
				span.style.opacity = opacity
				span.style.left = x - span.offsetWidth / 2 + 'px'
			} else {
				clearInterval(time)
				time = null
				span.remove()
			}
		}
	}, 10)
}
