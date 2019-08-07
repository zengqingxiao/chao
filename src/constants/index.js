export const API_HOST = process.env.NODE_ENV === 'production' ? '' : '/mock'  // 生产环境

// 当没有指定域名的情况下，浏览器会自动追加当前服务器下的域名,所以当是生产环境就是(正式服务环境)的时候不设置域名。
// 倘若crossDomain标识为null，则jQuery会自动根据本地url、端口来解析

export default {
  API_HOST
}