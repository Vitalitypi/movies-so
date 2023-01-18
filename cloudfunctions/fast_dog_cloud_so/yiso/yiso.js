// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')
cloud.init()
const url = 'https://yiso.fun/api/search?name='
// 云函数入口函数
exports.main = async (event, context) => {
  let keyword = encodeURI(event.keyword)
  var options = {
    method: 'GET',
    uri: url+keyword+'&pageNo='+event.page,
    headers: {
      'authority': 'yiso.fun',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      'cookie': '__vtins__JkIGvjjs25ETn0wz=%7B%22sid%22%3A%20%22196d0b26-a856-5a35-bb07-9fdc1785574a%22%2C%20%22vd%22%3A%201%2C%20%22stt%22%3A%200%2C%20%22dr%22%3A%200%2C%20%22expires%22%3A%201671113048544%2C%20%22ct%22%3A%201671111248544%7D; __51uvsct__JkIGvjjs25ETn0wz=1; __51vcke__JkIGvjjs25ETn0wz=8c4fd308-91b3-54bf-8067-f72bd298472d; __51vuft__JkIGvjjs25ETn0wz=1671111248546',
      'pragma': 'no-cache',
      'referer': 'https://yiso.fun/info?searchKey=%E9%98%BF%E5%87%A1%E8%BE%BE',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    }
  };
  return await rp(options).then(res=>{
    res = JSON.parse(res)
    if(res['code']==200&&res['msg']=='SUCCESS'){
      return {
        code:200,
        data:res.data
      }
    }
  })
}