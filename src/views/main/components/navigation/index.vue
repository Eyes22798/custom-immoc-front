<template>
  <mobile-navigation-vue v-if="isMobileTerminal" :data="categoryData" />
</template>

<script setup>
  import { isMobileTerminal } from '@/utils/flexible'
  import mobileNavigationVue from './mobile/index.vue'
  import { getCategory } from '@/api/category'
  import { ref } from 'vue'

  const categoryData = ref([])
  const getCategoryData = async () => {
    const { data } = await getCategory()
    categoryData.value = data.categorys
  }
  getCategoryData()
</script>
