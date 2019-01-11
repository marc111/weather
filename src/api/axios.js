import axios from 'axios'
import { removeUserIng, getUserIng } from 'common/js/util'
// import { errorNotice, getSessionStorage } from 'common/js/dom'
import iView from 'iview'

iView.LoadingBar.config({
  height: 3,
  // color: '#47cb89'
  color: '#ff7f27'
})
/* eslint-disable */
const info = getUserIng()
let sanfang_integration_service_loginfo = {}
if (info) {
  sanfang_integration_service_loginfo = {
    'department_code': info.department_code,
    'logintime': info.logintime,
    'role': info.role,
    'systemId': info.systemId,
    'system_name': info.system_name,
    'department_name': info.department_name,
    'mobile': info.mobile,
    'remark': info.remark,
    'userid': info.userid,
    'realname': info.realname,
    'token': info.token,
    'role_id': info.role_id,
    'loginip': info.loginip,
    '_id': info._id,
    'department_level': info.department_level,
    'department_fullname': info.department_fullname,
    'username': info.username
  }
} else {
  sanfang_integration_service_loginfo = {}
}
const timeOut = '登录超时，请重新登录。'

// 页面接口通用接口 get
export function ajaxGet (url = '', data = {}, option = {}) {
  data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
  url = `${httpUrl}${url}?${systemId}`
  return axios.get(url, {
    params: data,
    ...option
  }).then(res => {
    if (res.data.message !== '用户名或密码错误' && res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      removeUserIng()
      alert(timeOut)
      window.location.href = location.pathname
      return
    }
    return Promise.resolve(res.data)
  }).catch(res => {
    return Promise.resolve(res.data)
  })
}

// 页面接口通用接口 get
export function ajaxGet1 (url = '', data = {}, option = {}) {
  return axios.get(url, {
    params: data,
    ...option
  }).then(res => {
    if (res.data.message !== '用户名或密码错误' && res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      removeUserIng()
      alert(timeOut)
      window.location.href = location.pathname
      return
    }
    return Promise.resolve(res.data)
  }).catch(res => {
    return Promise.resolve(res.data)
  })
}

// var timeOutArr = []
var timer = 1
// 页面接口通用接口 Post
export function ajaxPost (url = '', data = {}, option = {}) {
  window.clearTimeout(timer)
  timer = setTimeout(() => {
    alert(timeOut)
    window.location.href = location.pathname
  }, 3300000)
  iView.LoadingBar.start()
  data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
  url = `${httpUrl}${url}?${systemId}`
  return axios.post(url, data, option).then(res => {
    if (res.data.message !== '用户名或密码错误' && res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      removeUserIng()
      window.location.href = location.pathname
      return
    }
    iView.LoadingBar.finish()
    return Promise.resolve(res.data)
  }).catch(res => {
    iView.LoadingBar.error()
    return Promise.resolve(res.data)
  })
}

// 页面接口通用接口 post
export function ajaxPost1 (url = '', data = {}, option = {}) {
  return axios.post(url, data, option).then(res => {
    if (res.data.message !== '用户名或密码错误' && res.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
      removeUserIng()
      alert(timeOut)
      window.location.href = location.pathname
      return
    }
    return Promise.resolve(res.data)
  }).catch(res => {
    return Promise.resolve(res.data)
  })
}

// 页面接口通用接口 All
export function ajaxAll (arr, option = {}) {
  let ajaxArr = []
  data.sanfang_integration_service_loginfo = sanfang_integration_service_loginfo
  arr.map(item => {
    if (item.method === 'get') {
      ajaxArr.push(axios.get(`${httpUrl}${item.url}`, {
        params: item.data,
        ...option
      }))
    } else {
      ajaxArr.push(axios.post(`${httpUrl}${item.url}`, item.data, option))
    }
  })

  return axios.all(ajaxArr).then((...res) => {
    let timeout = false
    let data = []
    for (let item of res[0]) {
      if (ires.data.message !== '用户名或密码错误' && tem.data.code === ERR_TIMEOUT || res.data.code === ERR_TOKEN_NOTFOUND || res.data.code === '0005') {
        removeUserIng()
        alert(timeOut)
        window.location.href = location.pathname
        timeout = true
      }
      data.push(item)
    }

    return Promise.resolve(data)
  }).catch((...res) => {
    return Promise.resolve(res)
  })
}
/* eslint-enable */
