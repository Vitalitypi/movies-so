// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require("request-promise")
const comments = 15//每条热搜爬取评论数量
const Cheerio = require('cheerio');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const infoUrl = "https://s.weibo.com/weibo?q=%23"+encodeURI(event.keyword)+"%23"
  return await rp({
      method: 'GET',
      url: infoUrl,
      json: true,
      headers: {
        'user-agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        'cookie':'SUB=_2AkMWvFaxf8NxqwJRmP4RzG7gZY91wgzEieKg4KdqJRMxHRl-yT8XqhxdtRB6PTx4UAWr2-kBQwZ1HYArN4YAW2cMS6CL; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9Whkm-rFSm0yR_CvgvzlZe42; _s_tentry=passport.weibo.com; Apache=5375211003204.768.1642125632605; SINAGLOBAL=5375211003204.768.1642125632605; ULV=1642125632625:1:1:1:5375211003204.768.1642125632605:',
      },
    })
    .then(function(res){
      var $ = Cheerio.load(res)
      const leads = $('.card-topic-lead p');
      let title = "导语:..."
      console.log(leads.length)
      if(leads.length>0){
        title = leads[0].children[0].data
      }
      const elements = $('.content');
      // 话题：node.children[0].data
      //最多请求5条
      let length = comments
      if(elements.length<length){
          length = elements.length
      }
      var arr = []
      for (let j = 0; j < length; j++) {
        let p = elements[j].childNodes[7]
        if(elements[j].childNodes[7]==undefined||elements[j].childNodes[7].attribs==undefined){
          p = elements[j].childNodes[4].next
        }
          let name = p.attribs['nick-name']
          let nodes = p.childNodes
          let info = ""
          for (let i = 0; i < nodes.length; i++) {
              const node = nodes[i];
              if(node.name=='a'){
                  if(node.attribs['action-type']=='fl_fold'){
                      break
                  }
                  let str = node.children[0].data
                  if(str!=undefined)
                  info+=str
              }
              if(node.name==undefined){
                  info+=node.data
              }
          }
          arr.push({
            name:name,
            info:info
          })
      }
      let ans = {
        title:title,
        info:arr
      }
      return ans
    }).catch(err=>{
      console.log(err)
    })
}
