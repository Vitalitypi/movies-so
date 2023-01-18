// 云函数入口文件

const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()

// https://www.niceso.fun/search/?type=all&q=大兵&page=2
const url = 'https://www.niceso.fun/search/?type=all&q='
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('hello,world')
  let keyword = encodeURI(event.keyword)
  var options = {
    'method': 'GET',
    uri: url+keyword+'&page='+event.page,
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
    var ans = []
    var $ = Cheerio.load(res);
    let items = $('.search-item')
    let pages = 0
    if(event.page==1&&items.length>0){
      pages = $('.page-num-box')[0].childNodes[7].firstChild.data
    }
    for (let i = 0; i < items.length; i++) {
        console.log(i)
        const item = items[i];
        let des = item.firstChild.nextSibling.nextSibling.nextSibling
        let note = des.nextSibling.nextSibling
        if(item.firstChild.nextSibling.firstChild.children.length==0){
          continue
        }
        let title = item.firstChild.nextSibling.firstChild.children[0].data
        let link = item.firstChild.nextSibling.attribs.href
        if(note.childNodes.length<3&&note.childNodes[0].nextSibling.children.length>0&&note.childNodes[2].nextSibling.children.length>0){
          continue
        }
        let info = dfs(des)+note.childNodes[0].nextSibling.children[0].data+'\t'+note.childNodes[2].nextSibling.children[0].data
        ans.push({
          title:title,
            info:info,
            link:link
        })
    }
    if(event.page==1){
      //需要返回总页数
      return {
        code:200,
        infos:ans,
        pages:pages
      }
    }
    return {
      code:200,
      infos:ans
    }
  })
}
function dfs(root) {
  let ans = ""
  let nodes = root.childNodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type == 'text') {
      ans += node.data + '\n'
    } else {
      if(node.firstChild==undefined){
        continue
      }else{
        ans += node.firstChild.data + '\n'
      }
    }
  }
  return ans
}