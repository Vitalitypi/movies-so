// 云函数入口文件
const cloud = require('wx-server-sdk')
const Cheerio = require('cheerio');
const rp = require('request-promise')

cloud.init()
const url = 'https://pan.qianfan.app/search/?pan=all&type=all&q='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  var options = {
    method: 'GET',
    uri: url+keyword+'&page='+event.page,
    headers: {
      'authority': 'tg.qianfan.app',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cookie': '_ga=GA1.1.583029899.1671110907; csrftoken=RhSNvsa4fKyeOnwahhDFCnuUuTYY0DB9dBWEkPKB1v0nOwoKMXqvyW3uFG40I1OW; QianFanID=glf8ukvhtistgjmejdyooz2b98sd1she; _ga_MFX1XD8TQP=GS1.1.1672995625.17.1.1672995747.0.0.0; _ga_6Z94VT54DV=GS1.1.1672995748.21.0.1672995748.0.0.0',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    var ans = []
    var $ = Cheerio.load(res);
    let titles = $('.search-title')
    // let digests = $('.search-des')
    // let notes = $('.search-note')
    let pages = 1
    if(event.page==1&&titles.length>0){
      pages =  titles[titles.length-1].parent.parent.nextSibling.nextSibling.childNodes[7].firstChild.data
    }
    for (let i = 0; i < titles.length; i++) {
      let from = titles[i].firstChild.attribs['alt']
      let title = titles[i].lastChild.data
      let link = titles[i].parent.attribs['href']
      let digest = titles[i].parent.nextSibling.nextSibling
      let note = titles[i].parent.nextSibling.nextSibling.nextSibling.nextSibling
      let des = []
      if(digest.firstChild.data=='......'){
        des = ['......']
      }else{
        des = getDigest(digest)
      }
      des.push(note.childNodes[1].firstChild.data+'\t'+note.childNodes[3].firstChild.data)
      ans.push({
        link:link,
        title:title,
        from:from,
        des:des
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

function getDigest(root){
  let nodes = root.childNodes
  // let ans = ''
  let ans = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    // ans+=node.firstChild.data+'\n'
    ans.push(node.firstChild.data+'\n')
  }
  return ans
}