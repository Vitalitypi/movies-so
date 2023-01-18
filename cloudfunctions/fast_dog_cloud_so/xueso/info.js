// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

const url = 'https://www.zhaokeya.com'
// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    'method': 'GET',
    uri: url+event.article,
    'headers': {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Cookie': 'Hm_lvt_d93cb096072b9f1fec622f0dd1a74061=1671119078; Hm_lpvt_d93cb096072b9f1fec622f0dd1a74061=1671119103',
      'Pragma': 'no-cache',
      'Referer': 'https://www.zhaokeya.com/search?q=%E4%BD%A0%E5%A5%BD',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"'
    }
  };
  return await rp(options).then(res=>{
    var $ = Cheerio.load(res);
    let node = $('.fa-unlock-alt')[0]
    let rows = $('.data_row')
    let title = rows[0].lastChild.prev.children[0].data
    let time = rows[1].lastChild.prev.children[0].data
    let des = getText(rows[2].lastChild.prev)
    let info = getInfo(node)
    return {
      code:200,
      title:title,
      time:time,
      des:des,
      info:info
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
function getInfo(root){
  let ans = ""
  if(root==undefined){
    return ans
  }
  let nodes = root.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if(node.type=='tag'){
      if(nodes.length==i+2&&node.parent.type=='tag'&&node.parent.name=='i'){
        break
      }else{
        ans+=getInfo(node)
      }
    }else{
      if(node.parent.type=='tag'&&node.parent.name=='i'){
        continue
      }else{
        ans+=node.data+'\n'
      }
    }
  }
  return ans
}