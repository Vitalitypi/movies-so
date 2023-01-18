// 云函数入口文件
const cloud = require('wx-server-sdk')
const url = "https://weibo.com/ajax/side/hotSearch"
const rp = require("request-promise")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return await rp({
    method: 'GET',
    url: url,
    json: true,
    headers: {
      'user-agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      'cookie':'SUB=_2AkMWvFaxf8NxqwJRmP4RzG7gZY91wgzEieKg4KdqJRMxHRl-yT8XqhxdtRB6PTx4UAWr2-kBQwZ1HYArN4YAW2cMS6CL; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9Whkm-rFSm0yR_CvgvzlZe42; _s_tentry=passport.weibo.com; Apache=5375211003204.768.1642125632605; SINAGLOBAL=5375211003204.768.1642125632605; ULV=1642125632625:1:1:1:5375211003204.768.1642125632605:',
    },
  })
.then(res=>{
    if(res.ok==1){
        return {
          info:res.data.realtime,
          flag:true
        }
    }
})
}