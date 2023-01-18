const nice = require('./nice/nice')
const niceLink = require('./nice/info')
const qianfan = require('./qianfan/qianfan')
const yiso = require('./yiso/yiso')
const upso = require('./upso/upso')
const xueso = require('./xueso/xueso')
const xueInfo = require('./xueso/info')
const zhaoso = require('./zhaoso/zhaoso')
const zhaoInfo = require('./zhaoso/info')
const qianpan = require('./qianpan/index')
const qianInfo = require('./qianpan/info')

// 云函数入口函数
//使用聚合对ShareInfo进行联表查询
exports.main = async (event, context) => {
  switch (event.type){
    case '2':
      return await nice.main(event,context);
    case '2-info':
      return await niceLink.main(event,context);
    case '3':
      return await qianfan.main(event,context)
    case '4':
      return await yiso.main(event,context)
    case '5':
      return await upso.main(event,context)
    case '6':
      return await xueso.main(event,context)
    case '6-info':
      return await xueInfo.main(event,context)
    case '7':
      return await zhaoso.main(event,context)
    case '7-info':
      return await zhaoInfo.main(event,context)
    case '8':
      return await qianpan.main(event,context)
    case '8-info':
      return await qianInfo.main(event,context)
    
  }
}