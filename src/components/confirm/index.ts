import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */

export const confirm = (title: string, content: string, cancelText = '取消', confirmText = '确定') => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }
    const close = () => {
      render(null, document.body)
    }

    const cancelHandler = () => {
      reject(new Error('cancel'))
    }

    const confirmHandler = () => {
      resolve(true)
    }

    render(
      h(confirmComponent, { title, content, cancelText, confirmText, confirmHandler, cancelHandler, close }),
      document.body
    )
  })
}
