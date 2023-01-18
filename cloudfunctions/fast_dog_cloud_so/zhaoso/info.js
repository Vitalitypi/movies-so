// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

const url = 'https://zhaoziyuan.la/'
// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    'method': 'GET',
    uri: url+event.link,
    'headers': {
      'authority': 'zhaoziyuan.la',
      'cookie':'Hm_lvt_f8dbe8e3528b7f9c3a3ac55d5d63f51a=1671161747; __gads=ID=e1d8e0ac30ee168e-226d1d3eebd800a6:T=1671161747:RT=1671161747:S=ALNI_MY_FFcz_LTuH9CWNyXC-is9MqTFEQ; __gpi=UID=00000b914039b7b9:T=1671161747:RT=1671372709:S=ALNI_MYYl6KESJwsOQB0bHO-rD3lXnNGKw; username=5474; loginhash=6db84b44cf20f668849382059bdbcc1a; Hm_lpvt_f8dbe8e3528b7f9c3a3ac55d5d63f51a=1671803287',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var $ = Cheerio.load(res);
    let nodes = $('.news_box')[0].childNodes
    let link = nodes[nodes.length-8].attribs['href']
    let info = []
    for(let i=nodes.length-10;i>=0;i-=2){
      if(nodes[i].attribs['class']=='zuoyou'){
        info.push(getInfo(nodes[i]))
      }else{
        break
      }
    }
    return {
      link:link,
      info:info,
      code:200
    }
  })
}
function getInfo(root){
  let ans = ""
  if(root==undefined){
    return ans
  }
  let nodes = root.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(node.type=='tag'){
      ans+=getInfo(node)
    }else{
      ans+=node.data
    }
  }
  return ans
}