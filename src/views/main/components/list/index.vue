<template>
  <!-- 列表处理 -->
  <m-infinite-list v-model="isLoading" :is-finished="isFinished" @on-load="getPexelsData">
    <m-waterfall :data="pexelsList" :column="isMobileTerminal ? 2 : 5" :picture-pre-reading="false" class="w-full px-1">
      <template #default="{ item, width }">
        <itemVue :data="item" :width="width" />
      </template>
    </m-waterfall>
  </m-infinite-list>
</template>

<script setup lang="ts">
  import { getPexelsList, PexelList } from '@/api/pexels'
  import itemVue from '../list/item.vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import { getStoreRefs, appStore } from '@/store'

  /**
   * 构建数据请求
   */
  let query = {
    page: 1,
    size: 20,
    categoryId: '',
    searchText: ''
  }
  const pexelsList = ref<PexelList[]>([])

  // 数据是否在加载中
  const isLoading = ref(false)
  // 数据是否全部加载完成
  const isFinished = ref(false)

  /**
   * 加载数据的方法
   */
  const getPexelsData = async () => {
    // 数据全部加载完成则 return
    if (isFinished.value) {
      return
    }

    // 完成第一次请求之后，后续请求让 page 自增
    if (pexelsList.value.length) {
      query.page += 1
    }

    // 触发接口请求
    const { data } = await getPexelsList(query)
    // 初始请求清空数据源
    if (query.page === 1) {
      pexelsList.value = data.list
    } else {
      pexelsList.value.push(...data.list)
    }
    // 判断数据是否全部加载完成
    if (pexelsList.value.length === data.total) {
      isFinished.value = true
    }
    // 修改 loading 标记
    isLoading.value = false
  }

  /**
   * 通过此方法修改 query 请求参数，重新发起请求
   */
  const resetQuery = (newQuery: Record<string, string | number>) => {
    query = { ...query, ...newQuery }
    // 重置状态
    isFinished.value = false
    pexelsList.value = []
  }

  const { searchText } = getStoreRefs(appStore.useApp)
  const { currentCategory } = getStoreRefs(appStore.useCategory)

  /**
   * 监听搜索内容项的变化
   */
  watch(
    () => searchText,
    (val) => {
      // 重置请求参数
      resetQuery({
        page: 1,
        searchText: val
      })
    }
  )

  /**
   * 监听 currentCategory 的变化
   */
  watch(
    () => currentCategory.value,
    () => {
      // 重置请求参数
      resetQuery({
        page: 1,
        categoryId: currentCategory.value.id
      })
    }
  )
</script>
