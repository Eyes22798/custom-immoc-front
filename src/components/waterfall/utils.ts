/**
 * 从 itemElement 中抽离出所有的 imgElements
 */

export const getImgElements = (itemElements: Array<Element>) => {
  const imgElements: HTMLImageElement[] = []
  itemElements.forEach((el: Element) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (imgElements: Array<HTMLImageElement>) => {
  return imgElements.map((el: HTMLImageElement) => el.src)
}

/**
 * 监听图片数组加载完成（通过 promise 完成）
 */
export const onComplateImgs = (imgs: Array<string>) => {
  // promise 集合
  const promiseAll: Array<Promise<{ img: string; index: number }>> = []
  // 循环构建 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve) => {
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })

  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj: Record<string, number>) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}

/**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj: Record<string, number>) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj: Record<string, number>) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
