<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- 滑块 -->
      <li class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200" :style="sliderStyle"></li>

      <!-- category item -->
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        :ref="setItemRef"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100 ': currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>

    <m-popup v-model="isOpenPopup">
      <menu-vue @on-item-click="onItemClick"></menu-vue>
    </m-popup>
  </div>
</template>

<script setup lang="ts">
  import { useScroll } from '@vueuse/core'
  import { getStoreRefs, appStore } from '@/store'
  import MenuVue from '../../menu/index.vue'

  interface Category {
    id: string
    name: string
  }
  const isOpenPopup = ref(false)
  let itemRefs = [] as any
  const setItemRef = (el: any) => {
    if (el) {
      itemRefs.push(el)
    }
  }
  const { categorys, currentCategoryIndex } = getStoreRefs(appStore.useCategory)

  // 获取 ul 元素，以计算偏移位置
  const ulTarget = ref(null)
  const { x: ulScrollLeft } = useScroll(ulTarget)
  const sliderStyle = ref({
    transform: 'translateX(0)',
    width: '52px'
  })
  watch(
    () => currentCategoryIndex.value,
    (val) => {
      // 获取选中元素的 left、width
      const { left, width } = itemRefs[val].getBoundingClientRect()
      // 为 sliderStyle 设置属性
      sliderStyle.value = {
        // ul 横向滚动位置 + 当前元素的 left 偏移量
        transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
        width: width + 'px'
      }
    }
  )

  // item 点击事件
  const onItemClick = (item: Category) => {
    appStore.useCategory.changeCurrentCategory(toRaw(item))
    isOpenPopup.value = false
  }

  onBeforeUpdate(() => {
    itemRefs = []
  })
</script>
