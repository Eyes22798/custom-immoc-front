<template>
  <div>
    <!-- teleport -->
    <teleport to="body">
      <!-- 蒙板 -->
      <transition name="fade">
        <div v-if="isOpen" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" />
      </transition>

      <!-- 内容 -->
      <transition name="popup-down-up">
        <transition name="popup-down-up">
          <div v-if="isOpen" v-bind="$attrs" class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
            <slot />
          </div>
        </transition>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
  import { useScrollLock, useVModel } from '@vueuse/core'
  const props = defineProps({
    modelValue: { type: Boolean, default: false }
  })

  const emit = defineEmits(['update:modelValue'])
  const isOpen = useVModel(props, 'modelValue', emit)
  const isLocked = useScrollLock(document.body)

  watch(
    isOpen,
    (v) => {
      if (v) {
        isLocked.value = true
      }
    },
    { immediate: true }
  )
</script>

<style lang="less" scoped>
  // fade 展示动画
  .fade-enter-active {
    transition: all 0.3s;
  }

  .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  // popup-down-up 展示动画
  .popup-down-up-enter-active {
    transition: all 0.3s;
  }

  .popup-down-up-leave-active {
    transition: all 0.3s;
  }

  .popup-down-up-enter-from,
  .popup-down-up-leave-to {
    transform: translateY(100%);
  }
</style>
