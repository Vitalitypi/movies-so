// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const url = 'https://gitcafe.net/tool/alipaper/'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let msg = ""
  //开始爬取
  var options = {
    'method': 'POST',
    uri: url,
    form:{
      'action': 'search',
      'keyword': event.Content
    },
    headers: {
      'Accept': '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://u.gitcafe.net',
      'Pragma': 'no-cache',
      'Referer': 'https://u.gitcafe.net/',
    },
  };
  return await rp(options).then(res=>{
    let infos = JSON.parse(res)
    if(infos.length==0){
      return {
        ToUserName: event.FromUserName,
        FromUserName: event.ToUserName,
        CreateTime: Date.parse(new Date())/1000,
        MsgType: 'text',
        Content: "未知错误！\n\n点击这里"+'<a data-miniprogram-appid="wxfba7eea5ba6845f4" data-miniprogram-path="pages/search/index">跳转至小程序</a>获取资源~'
      }
    }
    msg+="以下是检索结果(共有"+infos.length+"条)：\n"
    let flag = false
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i]
      msg+=(i+1)+".名称："+info.title+"\n链接："+"https://www.aliyundrive.com/s/"+info.key+"\n"
      if(msg.length>1200){
        flag = true
        msg+="由于公众号限制，只能回复"+(i+1)+"条数据，请点击这里"+'<a data-miniprogram-appid="wxfba7eea5ba6845f4" data-miniprogram-path="pages/search/index">跳转至小程序</a>获取更多资源~'
        break
      }
    }
    if(!flag){
      msg+="\n点击这里"+'<a data-miniprogram-appid="wxfba7eea5ba6845f4" data-miniprogram-path="pages/search/index">跳转至小程序</a>获取其他资源~'
    }
    return {
      ToUserName: event.FromUserName,
      FromUserName: event.ToUserName,
      CreateTime: Date.parse(new Date())/1000,
      MsgType: 'text',
      Content: msg
    }
  })  
}