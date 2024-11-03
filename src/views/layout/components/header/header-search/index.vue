<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler" @clear="onSearchHandler">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue v-show="inputValue" :search-text="inputValue" @item-click="onSearchHandler"></hint-vue>
          <!-- 最近搜索 -->
          <history-vue v-show="!inputValue" @item-click="onSearchHandler"></history-vue>
          <!-- 推荐主题 -->
          <theme-vue v-show="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import hintVue from './hint.vue'
  import historyVue from './history.vue'
  import themeVue from './theme.vue'
  import { appStore } from '@/store'

  const inputValue = ref('')

  // 搜索的回调事件
  const onSearchHandler = (val) => {
    inputValue.value = val
    if (val) {
      // 保存历史记录
      appStore.useSearch.addHistory(val)
      console.log('触发 searchText 变化')
      // 触发 searchText 变化
      appStore.useApp.changeSearchText(val)
    }
  }
</script>

<style lang="scss" scoped></style>
