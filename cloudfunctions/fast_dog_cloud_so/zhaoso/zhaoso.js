// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

const url = 'https://zhaoziyuan.la/so?filename='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  var options = {
    'method': 'GET',
    uri: url+keyword+'&page='+event.page,
    'headers': {
      'authority': 'zhaoziyuan.la',
      'cookie':'Hm_lvt_f8dbe8e3528b7f9c3a3ac55d5d63f51a=1671161747; __gads=ID=e1d8e0ac30ee168e-226d1d3eebd800a6:T=1671161747:RT=1671161747:S=ALNI_MY_FFcz_LTuH9CWNyXC-is9MqTFEQ; __gpi=UID=00000b914039b7b9:T=1671161747:RT=1671372709:S=ALNI_MYYl6KESJwsOQB0bHO-rD3lXnNGKw; username=5474; loginhash=6db84b44cf20f668849382059bdbcc1a; Hm_lpvt_f8dbe8e3528b7f9c3a3ac55d5d63f51a=1671803287',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var ans = []
    var $ = Cheerio.load(res);
    let items = $('.news_text a')
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let link = item.attribs['href']
      if(link=='message.html'){
        return {
          code:205//无资源
        }
      }
      let title = item.firstChild.nextSibling.firstChild.data
      let digest = item.lastChild.prev.firstChild.data
      ans.push({
        title:title,
        link:link,
        digest:digest
      })
    }
    return {
      code:200,
      infos:ans
    }
  })
}
