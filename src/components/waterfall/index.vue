<template>
  <div
    ref="containerTarget"
    class="relative"
    :style="{
      height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }"
  >
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 无数据 -->
    <div v-else>加载中...</div>
  </div>
</template>

<script setup lang="ts">
  import { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
  // 使用 defineProps 并添加类型
  const props = withDefaults(
    defineProps<{
      data: Array<Record<string, any>> // 数据源
      nodeKey: string // 唯一标识的 key
      column: number // 列数
      columnSpacing: number // 列间距
      rowSpacing: number // 行间距
      picturePreReading: boolean // 是否需要进行图片预读取
    }>(),
    {
      nodeKey: '',
      column: 2,
      columnSpacing: 20,
      rowSpacing: 20,
      picturePreReading: true
    }
  )

  // 容器的总高度
  const containerHeight = ref(0)
  // 记录每一列的高度 key 所在列 value 所在列的高度
  const columnHeightObj = ref<Record<string, number>>({})
  // 构建记录各列高度的对象
  const useColumnHeightObj = () => {
    columnHeightObj.value = {}
    for (let i = 0; i < props.column; i++) {
      columnHeightObj.value[i] = 0
    }
  }

  // 容器实例
  const containerTarget = ref<HTMLElement | null>(null)
  // 容器总高度 （不包含 padding margin border）
  const containerWidth = ref(0)
  // 容器左边距，计算 item left 时，需要使用定位
  const containerLeft = ref(0)

  // 计算容器高度
  const useContainerWidth = () => {
    const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value!, null)
    // 容器左边距
    containerLeft.value = parseFloat(paddingLeft)
    // 容器高度
    containerWidth.value = containerTarget.value!.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
  }
  // 列宽
  const columnWidth = ref(0)
  // 列间距合计
  const columnSpacingTotal = computed(() => {
    // 如果是5列，则存在 4 个列间距
    return (props.column - 1) * props.columnSpacing
  })

  /**
   * 开始计算
   */
  const useColumnWidth = () => {
    // 获取容器宽度
    useContainerWidth()
    // 计算列宽
    columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
  }

  onMounted(() => {
    // 计算列宽
    useColumnWidth()
  })

  // item 高度集合
  let itemHeights: number[] = []
  /**
   * 监听图片加载完成
   */
  const waitImgComplate = () => {
    itemHeights = []
    // 拿到所有元素
    let itemElements = [...document.querySelectorAll('.m-waterfall-item')] as HTMLElement[]
    // 获取所有元素的 img 标签
    const imgElements = getImgElements(itemElements)
    // 获取所有 img 标签的图片 src
    const allImgs = getAllImg(imgElements)
    onComplateImgs(allImgs).then(() => {
      // 图片加载完成，获取高度
      itemElements.forEach((item) => {
        itemHeights.push(item.offsetHeight)
      })
    })
    // 渲染位置
    useItemLocation()
  }
  /**
   * 图片不需要预加载时，计算 item 高度
   */
  const useItemHeight = () => {
    itemHeights = []
    // 拿到所有元素
    let itemElements = [...document.querySelectorAll('.m-waterfall-item')] as HTMLElement[]
    // 计算 item 高度
    itemElements.forEach((item) => {
      // 依据传入数据计算出的 img 高度
      itemHeights.push(item.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  }

  /**
   * 为每个 item 生成位置属性
   */
  const useItemLocation = () => {
    // 遍历数据源
    props.data.forEach((item, index) => {
      // 避免重复计算
      if (item._style) return
      // 生成 _style 属性
      item._style = {}
      // left
      item._style.left = getItemLeft()
      // top
      item._style.top = getItemTop()
      // 指定列高度自增
      increasingHeight(index)
    })
    // 指定容器高度
    containerHeight.value = getMaxHeight(columnHeightObj.value)
  }

  /**
   * 返回下一个 item 的 left
   */
  const getItemLeft = () => {
    // 最小高度所在的列 * (列宽 + 间距)
    const column = getMinHeightColumn(columnHeightObj.value)
    return Number(column) * (columnWidth.value + props.columnSpacing) + containerLeft.value
  }

  /**
   * 返回下一个 item 的 top
   */
  const getItemTop = () => {
    // 列高对象中的最小的高度
    return getMinHeight(columnHeightObj.value)
  }
  /**
   * 指定列高度自增
   */
  const increasingHeight = (index: number) => {
    // 最小高度所在的列
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    // 改列高度自增
    columnHeightObj.value[Number(minHeightColumn)] += itemHeights[index] + props.rowSpacing
  }

  /**
   * 在组件销毁时，清除所有的 _style
   */
  onUnmounted(() => {
    props.data.forEach((item) => {
      delete item._style
    })
  })

  // 触发计算
  watch(
    () => props.data,
    (newVal) => {
      // 重置数据源
      const resetColumnHeight = newVal.every((item) => !item._style)
      if (resetColumnHeight) {
        // 构建高度记录容器
        useColumnHeightObj()
      }
      nextTick(() => {
        if (props.picturePreReading) {
          waitImgComplate()
        } else {
          useItemHeight()
        }
      })
    },
    {
      immediate: true,
      deep: true
    }
  )

  /**
   * 监听列数变化，重新构建瀑布流
   */
  const reset = () => {
    // 重新计算列宽
    setTimeout(() => {
      useColumnWidth()
      // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
      props.data.forEach((item) => {
        item._style = null
      })
    }, 100)
  }

  watch(
    () => props.column,
    () => {
      if (props.picturePreReading) {
        // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
        columnWidth.value = 0
        // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
        nextTick(reset)
      } else {
        reset()
      }
    }
  )
</script>
