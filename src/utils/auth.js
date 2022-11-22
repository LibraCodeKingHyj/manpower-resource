import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const timeKey = 'hrsaas-timestamp-key'
export function getToken() {
  // 获取token
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // 设置token
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
