import { GET } from './config'

const I_HEAD = '/mock'
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
 * 统计会员消费记录
 */
export const statisticsAPI = (obj = {}) => {
  const url = `${I_HEAD}/StatisticsAPI.ashx`
  const data = Object.assign(obj, {
    OPType: 'LIST'
  })
  return GET({ url, data })
}