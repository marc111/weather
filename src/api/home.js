import { ajaxGet } from './axios'

// 首页-综合
export function Gethomemore (obj) {
  let url = 'mpsp/web/index/synthesis'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 首页-十天天气预报图
export function Getshare10 (obj) {
  let url = 'mpsp/web/folo10dLastShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 首页-十五天天气预报
export function Getshare15 (obj) {
  let url = 'mpsp/web/folo15dLastShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}
