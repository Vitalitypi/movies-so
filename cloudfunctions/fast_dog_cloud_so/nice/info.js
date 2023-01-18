// 云函数入口文件

const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

const url = 'https://www.niceso.fun'
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('hello,world')
  var options = {
    method: 'GET',
    uri: url+event.share,
    'headers': {
      'authority': 'www.niceso.fun',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'cookie': 'Hm_lvt_b76fd56943da37dc223eb2829d4bb667=1671082207,1671102418,1671109340,1671155510; csrftoken=oCfwu2EuOvTguxz8t0nP4FngO25KFU2Vxw7cLF1L6rPyUTZAQheVQ5hFwBE4Z3F7; NiceID=5aqbprhzfw46aarfw0cvspdb5ni1oocn; Hm_lpvt_b76fd56943da37dc223eb2829d4bb667=1672995548',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var $ = Cheerio.load(res);
    //获取总链接
    let button = $('.item-detail-visit')
    if(button.length==0){
      return {
        code:400
      }
    }
    let base64 = button[0].attribs['data-url']
    var b = Buffer.from(base64,'base64')
    var link = b.toString()
    // return link.split('/s/')[1]
    //获取详细内容
    //获取详细内容
    let items = $('.open-folder').slice(0,10)//只获取前10项详细文件夹...
    let ans = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      ans.push({
        title:item.prev.data,
        link:item.attribs['data-parent-id']
      })
    }
    return {
      code:200,
      url:link.split('/s/')[1],
      des:ans
    }
  })
}