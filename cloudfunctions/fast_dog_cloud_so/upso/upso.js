// 云函数入口文件
// 每页25条数据、首页多出两条广告
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()
const url = 'https://api.upyunso2.com/search?keyword='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  var options = {
    'method': 'GET',
    uri: url+keyword+'&page='+event.page,
    'headers': {
    }
  };
  return await rp(options).then(res=>{
    var b = Buffer.from(res,'base64')
    var info = b.toString()
    info = JSON.parse(info)
    if(info.status=='success'&&info.msg=='请求成功'){
      if(event.page==1){
        return {
          code:200,
          data:info.result.items.slice(2,27)
        }
      }else{
        return {
          code:200,
          data:info.result.items
        }
      }
    }else{
      return {
        code:205,
        mgs:info.msg
      }
    }
  })
}