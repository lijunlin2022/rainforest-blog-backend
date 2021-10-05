/**
 * 通用给工具函数
 */

const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001,           // 参数错误
  USER_ACCOUNT_ERROR: 20001,    // 账号或者密码错误
  USER_LOGIN_ERROR: 30001,      // 用户未登录
  BUSINESS_ERROR: 400,        // 业务请求失败
  AUTH_ERROR: 50001             // 认证失败或者 TOKEN 过期
}

module.exports = {
  /**
   * 分页结果封装
   * @param {number} current
   * @param {number} size
   * @returns 
   */
  pager ({ current = 1, size = 10 }) {
    current *= 1
    size *= 1
    const skipIndex = (current - 1) * size
    return {
      page: {
        current,
        size
      },
      skipIndex
    }
  },
  success (data = '', msg = '', code = CODE.SUCCESS) {
    return {
      code, data, msg
    }
  },
  fail (msg = '', code = CODE.BUSINESS_ERROR, data = '') {
    return {
      code, data, msg
    }
  },
}
