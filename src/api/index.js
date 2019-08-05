import { GET } from './config'

const I_HEAD = ''
/**
 * 获取会员列表
*/
export const memberTypeAPI = (obj = {}) => {
  const url = `${I_HEAD}/MemberTypeAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'LIST'
  })
  return GET({ url, data })
}

/**
 * 新增会员列表 
 */
export const addMemberTypeAPI = (obj = {}) => {
  const url = `${I_HEAD}/MemberTypeAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'ADD'
  })
  return GET({ url, data })
}

/**
 * 修改会员列表 
 */
export const alterMemberTypeAPI = (obj = {}) => {
  const url = `${I_HEAD}/MemberTypeAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'UPDATE'
  })
  return GET({ url, data })
}

/**
 * 上传csv 
 */
// export const upMemberTypeUrl = `${I_HEAD}/InputAPI.ashx`
export const upMemberTypeAPI = (obj = {}) => {
  const url = `${I_HEAD}/InputAPI.ashx`
  const data = Object.assign(obj, {
  })
  return GET({ url, data })
}

/**
 * 下载
 */
export const dowStatisticsAPI = (obj = {}) => {
  const url = `${I_HEAD}/StatisticsAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'EXPORT'

  })
  return GET({ url, data })
}

/**
 * 统计会员消费记录
 */
export const statisticsAPI = (obj = {}) => {
  const url = `${I_HEAD}/StatisticsAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'SEARCH'
  })
  return GET({ url, data })
}