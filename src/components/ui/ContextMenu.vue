<template>
    <div :id="props.key + '.tabMenu'" class="tabMenu" ref="tabMenu" style="width: 200px;">
        <el-input style="width: 0px;height: 0px;z-index: -1;" id="tabMenuInput" @blur="blur" @keyup="keyUp"></el-input>
        <div v-for="item in props.items" :key="item.name" @click="item.event" class="item">
            {{ item.displayName }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IContextMemuItem } from './Type';

const props = defineProps<{
    key: string,
    items: Array<IContextMemuItem>
}>()

console.log(props.items);


const onRightClick = (element: HTMLElement) => {
    element.oncontextmenu = (e) => {
        e.preventDefault()

        let tabMenu = document.getElementById(props.key + '.tabMenu');

        if (tabMenu!.style.display == 'block') {
            return
        }

        let mx = e.clientX;
        let my = e.clientY;

        var rmWidth = parseInt(tabMenu!.style.width);
        var pageWidth = document.documentElement.clientWidth;


        if ((mx + rmWidth) < pageWidth) {
            tabMenu!.style.left = mx + "px";
            tabMenu!.style.top = my + "px";
        }
        else {
            tabMenu!.style.left = mx + "px";
            tabMenu!.style.top = my + "px";
        }

        tabMenu!.style.display = 'block'
        tabMenu!.style.opacity = '100'
        tabMenu!.style.zIndex = '3001'

        document.getElementById('tabMenuInput')!.focus()
    }
}

const blur = () => {
    let tabMenu = document.getElementById(props.key + '.tabMenu');
    tabMenu!.style.opacity = '0';
    setTimeout(() => {
        tabMenu!.style.display = 'none'
    }, 300)
}
const keyUp = (e: KeyboardEvent) => {
    let tabMenu = document.getElementById(props.key + '.tabMenu');
    if (e.key == 'Escape') {
        tabMenu!.style.display = 'none'
        tabMenu!.style.opacity = '0';
    }
}

defineExpose({
    onRightClick
})

</script>
<style lang="scss" scoped>
.tabMenu {
    display: none;
    background: white;
    border: solid 1px #dadada;
    border-radius: 2px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.12);

    li {
        list-style: none;
        // border-bottom: solid 1px #dadada;
    }

    & :deep(.el-input__wrapper) {
        box-shadow: unset;
    }
}

.item {
    margin {
        top: 3px;
        bottom: 3px;
    }


    &:hover {
        background-color: #eeeeee;
    }
}
</style>