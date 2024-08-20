<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden" ref="ulTarget">
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
      >
        <svg-icon class="w-1.5 h-1.5" name="hamburger"></svg-icon>
      </li>

      <!-- 滑块 -->
      <li class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200" :style="sliderStyle"></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  // import { useScroll } from '@vueuse/core'
  import { getStoreRefs, appStore } from '@/store'

  interface Data {
    id: string
    name: string
  }
  defineProps<{
    data: Array<Data>
  }>()

  const sliderStyle = ref({
    transform: 'translateX(0)',
    width: '52px'
  })

  let itemRefs = []
  const setItemRef = (el: any) => {
    if (el) {
      itemRefs.push(el)
    }
  }

  console.log(setItemRef)

  onBeforeUpdate(() => {
    itemRefs = []
  })
  const { categorys } = getStoreRefs(appStore.useCategory)
  categorys.value.forEach((category: any) => {
    console.log(category)
  })

  watch(
    () => categorys.value,
    () => {}
  )
</script>
