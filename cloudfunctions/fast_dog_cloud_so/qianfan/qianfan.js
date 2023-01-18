// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()
const url = 'https://tg.qianfan.app/search/?q='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  // _ga=GA1.1.583029899.1671110907; csrftoken=RhSNvsa4fKyeOnwahhDFCnuUuTYY0DB9dBWEkPKB1v0nOwoKMXqvyW3uFG40I1OW; QianFanID=glf8ukvhtistgjmejdyooz2b98sd1she; _ga_MFX1XD8TQP=GS1.1.1672995625.17.1.1672995747.0.0.0; _ga_6Z94VT54DV=GS1.1.1672995748.21.0.1672995748.0.0.0
  // _ga=GA1.1.583029899.1671110907; _ga_6Z94VT54DV=GS1.1.1672153678.20.1.1672153696.0.0.0; csrftoken=RhSNvsa4fKyeOnwahhDFCnuUuTYY0DB9dBWEkPKB1v0nOwoKMXqvyW3uFG40I1OW; QianFanID=glf8ukvhtistgjmejdyooz2b98sd1she; _ga_MFX1XD8TQP=GS1.1.1672995625.17.1.1672995641.0.0.0
  var options = {
    method: 'GET',
    uri: url+keyword+'&page='+event.page,
    headers: {
      'authority': 'tg.qianfan.app',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'cookie': '_ga=GA1.1.583029899.1671110907; _ga_6Z94VT54DV=GS1.1.1672153678.20.1.1672153696.0.0.0; csrftoken=RhSNvsa4fKyeOnwahhDFCnuUuTYY0DB9dBWEkPKB1v0nOwoKMXqvyW3uFG40I1OW; QianFanID=glf8ukvhtistgjmejdyooz2b98sd1she; _ga_MFX1XD8TQP=GS1.1.1672995625.17.1.1672995641.0.0.0',
      'pragma': 'no-cache',
      'referer': 'https://tg.qianfan.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var ans = []
    var $ = Cheerio.load(res);
    let items = $('.search-post')
    let times = $('.post-time')
    let pages = 1
    if(event.page==1&&items.length>0){
      pages = $('.page-num-box')[0].childNodes[7].firstChild.data
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      ans.push({
        time:times[i].lastChild.data,
        info:getPs(item)
      })
    }
    if(event.page==1){
      return {
        code:200,
        pages:pages,
        infos:ans
      }
    }
    return {
      code:200,
      infos:ans
    }
  })
}

function getText(p){
  let ans=''
  if(p==undefined){
    return ans
  }
  let nodes = p.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(node.type=='text'){
      ans+=node.data+'\n'
    }
  }
  return ans
}
function getPs(root){
  let ans = ''
  let nodes = root.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(node.name=='p'){
      ans+=getText(node)
    }
  }
  return ans
}