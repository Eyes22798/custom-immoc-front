import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type: string, content: string, duration = 3000) => {
  /**
   * 动画结束时的回调
   */
  const onDestroy = () => {
    // 3. message 销毁
    render(null, document.body)
  }

  // 1. 创建 message 组件
  const vnode = h(messageComponent, { type, content, duration, destroy: onDestroy })
  // 2. message 渲染
  render(vnode, document.body)
}
