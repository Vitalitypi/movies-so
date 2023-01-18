// 云函数入口文件
const weiboWord = require("./weiboWord/index")
const weiboInfo = require("./weiboInfo/index")
const yiso = require("./yisoTop/index")
// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.type){
    case 'weiboWord':
      return await weiboWord.main(event,context)
    case 'weiboInfo':
      return await weiboInfo.main(event,context)
    case 'yisoTop':
      return await yiso.main(event,context)
  }
}