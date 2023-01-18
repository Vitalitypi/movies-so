// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

const url = 'https://www.zhaokeya.com/search?q='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  var options = {
    'method': 'GET',
    uri: url+keyword+'&page='+event.page+'&m=1',
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
    var ans = []
    var $ = Cheerio.load(res);
    let items = $('.search ul li')
    let total = $('.data_list_title font')[0].firstChild.data
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let a = item.firstChild.nextSibling.firstChild
      let title = getInfo(a)
      let link = a.attribs['href']
      let label = getLabel(item)
      let digest = getInfo(item.childNodes[13])
      ans.push({
        title:title,
        link:link,
        label:label,
        digest:digest
      })
    }
    //获取
    return {
      code:200,
      infos:ans,
      total:total
    }
  })
}
function getLabel(root){
  let ans = ''
  let nodes = root.childNodes
  for (let i = 5; i < nodes.length; i++) {
    const node = nodes[i];
    if(node.name!='span'){
      continue
    }
    if(node.attribs['class']=='summary'){
      break
    }
    if(ans==''){
      ans = node.firstChild.data
    }else{
      ans = ans+' | '+node.firstChild.data
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
      ans+=getInfo(node)
    }else{
      if(root.name=='span'){
        ans+=node.data+'\n'
      }else{
        ans+=node.data
      }
    }
  }
  return ans
}