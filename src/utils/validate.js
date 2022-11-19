/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验手机号
 */
export function validMobile(str) {
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(str)
}
