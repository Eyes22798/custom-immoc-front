<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>

<script setup lang="ts">
  import { getPexelsList, PexelList } from '@/api/pexels'
  import itemVue from '../list/item.vue'

  /**
   * 构建数据请求
   */
  let query = {
    page: 1,
    size: 20
  }
  const pexelsList = ref<PexelList[]>([])
  const getPexelsData = async () => {
    const { data } = await getPexelsList(query)
    console.log(data)
    pexelsList.value = data.list
  }
  getPexelsData()
</script>
