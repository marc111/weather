const getUserIng = function () {
  return localStorage.getItem('info')
}

let hostname = location.hostname // eslint-disable-line

let httpUrl1 = ''
let httpUrl2 = ''
let httpUrl3 = ''
let httpUrl4 = ''
let httpUrl5 = ''
let httpUrl6 = ''
let httpUrl7 = ''
let httpUrl8 = ''

switch (hostname) {
  case '192.168.1.7':
  // case '192.168.1.131' :
    httpUrl1 = 'http://192.168.1.7:8050/sanfangstruts/'
    // httpUrl1 = 'http://192.168.1.131:8080/sanfangstruts/';
    httpUrl2 = 'http://192.168.1.7:8050/'
    httpUrl3 = 'http://183.238.82.216:9080/'
    httpUrl4 = 'http://192.168.1.7:8050/sanfang/command/#/'
    httpUrl5 = 'http://192.168.1.7:8050/'
    httpUrl6 = 'http://202.105.25.138:20462/'
    httpUrl7 = 'http://202.105.25.138:20463/'
    httpUrl8 = 'http://free.ngrok.cc:14804/'
    break
  case '202.105.25.138':
    httpUrl1 = 'http://202.105.25.138:20465/sanfangstruts/'
    httpUrl2 = 'http://202.105.25.138:20465/'
    httpUrl3 = 'http://183.238.82.216:9080/'
    httpUrl4 = 'http://202.105.25.138:20465/sanfang/command/#/'
    httpUrl5 = 'http://202.105.25.138:20465/'
    httpUrl6 = 'http://202.105.25.138:20462/'
    httpUrl7 = 'http://202.105.25.138:20463/'
    httpUrl8 = 'http://free.ngrok.cc:14804/'
    break
  case '10.168.80.15':
    httpUrl1 = 'http://10.168.80.15:9080/sanfangstruts/'
    httpUrl2 = 'http://10.168.80.15:6060/'
    httpUrl3 = 'http://10.168.80.15:9080/'
    httpUrl4 = 'http://10.168.80.15:8090/sanfang/command/#/'
    httpUrl5 = 'http://10.168.80.15:9080/'
    httpUrl6 = 'http://10.168.80.11:6080/'
    httpUrl7 = 'http://10.168.80.11:8888/'
    httpUrl8 = 'http://10.168.80.9:8090/'
    break
  case '192.168.1.99':
    httpUrl1 = 'http://192.168.1.99:8050/sanfangstruts/'
    // httpUrl1 = 'http://192.168.1.131:8080/sanfangstruts/';
    httpUrl2 = 'http://192.168.1.99:8050/'
    httpUrl3 = 'http://183.238.82.216:9080/'
    httpUrl4 = 'http://192.168.1.99:8050/PRUM/command/#/'
    httpUrl5 = 'http://192.168.1.99:8050/'
    httpUrl6 = 'http://202.105.25.138:20462/'
    httpUrl7 = 'http://202.105.25.138:20463/'
    httpUrl8 = 'http://free.ngrok.cc:14804/'
  break
  // 这块不要动
  case '183.238.82.216':
    httpUrl1 = 'http://183.238.82.216:9080/sanfangstruts/'
    httpUrl2 = 'http://183.238.82.216:9080/'
    httpUrl3 = 'http://183.238.82.216:9080/'
    httpUrl4 = 'http://183.238.82.216:9080/sanfang/command/#/'
    httpUrl5 = 'http://183.238.82.216:9080/'
    httpUrl6 = 'http://202.105.25.138:20462/'
    httpUrl7 = 'http://202.105.25.138:20463/'
    httpUrl8 = 'http://free.ngrok.cc:14804/'
    break
  default:
    // httpUrl1 = 'http://202.105.25.138:20465/sanfangstruts/';
    httpUrl1 = 'http://192.168.1.7:8050/sanfangstruts/'
    // httpUrl1 = 'http://192.168.1.7:8060/sanfangstruts/'
    // httpUrl1 = 'http://192.168.1.137:8080/sanfangstruts/';
    httpUrl2 = 'http://192.168.1.7:8050/'
    httpUrl3 = 'http://192.168.1.222:8080/'
    httpUrl4 = 'http://202.105.25.138:20465/sanfang/command/#/'
    httpUrl5 = 'http://192.168.1.7:8050/'
    httpUrl6 = 'http://202.105.25.138:20462/'
    httpUrl7 = 'http://202.105.25.138:20463/'
    httpUrl8 = 'http://192.168.1.222:8090/'
    break
}

// 接口地址

const httpUrl = httpUrl1

// export const httpUrl = 'http://192.168.1.137:8080/sanfangstruts/'

// export const httpUrl = 'http://192.168.1.108:8080/sanfangstruts/'

// export const httpUrl = 'http://192.168.1.131:8080/sanfangstruts/';
// export const httpUrl = 'http://192.168.1.7:8050/sanfangstruts/';
// export const httpUrl = httpUrl1;
// export const httpUrl = 'http://192.168.1.7:8050/sanfangstruts/';
// export const httpUrl = 'http://202.105.25.138:20465/sanfangstruts/';
// export const httpUrl = 'http://10.168.80.15:8090/sanfangstruts/';

// export const httpUrl = httpUrl1;

// const IP = '10.168.80.15:8080';

// 数据一张图页面地址
const webHttpUrl = httpUrl2

// 数据一张图接口地址
// export const dataMapHttpUrl = 'http://10.168.80.15:8090/';
const dataMapHttpUrl = httpUrl3

// 指挥一张图页面地址
const commonMapHttpUrl = httpUrl4
// export const commonMapHttpUrl = 'http://free.ngrok.cc:14754/';

// 指挥一张图接口地址
const commonWebHttpUrl = httpUrl5
// export const commonMapHttpUrl = 'http://free.ngrok.cc:14754/';

// 地图20462地址
// export const mapHttpUrl20462 = 'http://10.168.80.11:6080/';
const mapHttpUrl20462 = httpUrl6

// 地图20463地址
// export const mapHttpUrl20463 = 'http://10.168.80.11:8888/';
const mapHttpUrl20463 = httpUrl7

// 气象天气预报接口地址
// export const weatherHttpUrl = 'http://10.168.80.9:8090/';
const weatherHttpUrl = httpUrl8

// 后台数据返回成功标识
const ERR_OK = '0000'

// 找不到token
const ERR_TOKEN_NOTFOUND = '0003'

// 登录超时
const ERR_TIMEOUT = '0004'

// js访问 static 文件夹路径
const Static = 'static/'

const systemId = 'systemId=1000010'

// 访问后台传的token值
function options () {
  let user = getUserIng() || {}
  return {
    headers: {
      token: JSON.parse(user).token
      // info: getUserIng()

    }
  }
}

// 自定义错误标识
const ERR_CUSTOM = '2000'
