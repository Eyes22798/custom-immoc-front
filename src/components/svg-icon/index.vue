<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="svg-icon">
  import { computed } from 'vue'

  const props = defineProps<{
    name: string
    color?: string
    fillClass?: string
  }>()
  // 真实显示的 svg 图标名（拼接 #icon-）
  const symbolId = computed(() => `#icon-${props.name}`)
</script>
