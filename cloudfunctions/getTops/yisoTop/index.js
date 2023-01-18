// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    'method': 'GET',
    uri: 'https://yiso.fun/api/hot/top?num=10',
    'headers': {
    }
  };
  return await rp(options).then(res=>{
    let infos = JSON.parse(res)
    if(infos.code==200&&infos.msg=="SUCCESS"){
      return infos.data
    }
  })
}