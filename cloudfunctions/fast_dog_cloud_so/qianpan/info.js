// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()
const url = 'https://pan.qianfan.app'
// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    method: 'GET',
    uri: url+event.link,
    headers: {
      'authority': 'tg.qianfan.app',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'cookie': '_ga=GA1.1.583029899.1671110907; csrftoken=RhSNvsa4fKyeOnwahhDFCnuUuTYY0DB9dBWEkPKB1v0nOwoKMXqvyW3uFG40I1OW; QianFanID=glf8ukvhtistgjmejdyooz2b98sd1she; _ga_MFX1XD8TQP=GS1.1.1672995625.17.1.1672995747.0.0.0; _ga_6Z94VT54DV=GS1.1.1672995748.21.0.1672995748.0.0.0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var ans = []
    var $ = Cheerio.load(res);
    let btn = $('.pan-url')[0]
    //copy-pwd btn-line btn
    let root = btn.attribs['data-url']
    let pwd = ''
    if(btn.nextSibling.nextSibling.attribs['class']=='copy-pwd btn-line btn'){
      pwd = btn.nextSibling.nextSibling.attribs['data-pwd']
    }
    let flag = btn.attribs['id'].split("")
    let origin = btn.parent.nextSibling.nextSibling
    let info = origin.parent.nextSibling.nextSibling.nextSibling.nextSibling
    let from = origin.firstChild.nextSibling.lastChild.data
    let items = info.childNodes
    for (let i = 1; i < items.length&&ans.length<10; i+=2) {//只获取前10项
      const item = items[i];
      if(i==1&&item.firstChild.data=='请前往夸克网盘获取资源详情...'){
        break
      }
      ans.push({
          text:item.firstChild.data,
          // link:item.lastChild.attribs['data-parent-id']==undefined?item.lastChild.attribs['data-file-id']:item.lastChild.attribs['data-parent-id']
      })
    }
    let url = root
    for (let i = 0; i < flag.length; i++) {
      const f = flag[i];
      if (isNaN(parseInt(f))) {
          var flagNum = parseInt(f, 16);
          url = url.substring(0, flagNum) + url.substring(flagNum + 1, flagNum + 10000)
      }
    }
    var b = Buffer.from(url,'base64')
    var link = b.toString()
    let result = {
      code:200,
      des:from,
      root:link,
      infos:ans,
      pwd:pwd
    }
    return result
  })
}
