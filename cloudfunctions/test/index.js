// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数
exports.main = async (event, context) => {
  if(event.type.length==1){
    //该类型为搜索类型
    const db = cloud.database()
    db.collection("HotTop").add({
      data:{
        time:new Date(),
        word:event.keyword,
        page:event.page,
        type:false
      }
    }).then(res=>{
      console.log(res)
    })
  }
  
}