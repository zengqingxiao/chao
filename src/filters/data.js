export default {
  /**
   * 将会有类型ID转为类型名字
   * value ID
   * obj 会员类型对象
   */
  typeTurnName (value, arr) {

    return arr.find((item) => {
      return item.MemberTypeID === value
    }).MemberTypeName

  }
}