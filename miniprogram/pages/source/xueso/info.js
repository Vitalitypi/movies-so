// pages/source/xueso/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:'',
    article:'',
    loading: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      link:e.link
    })
    console.log(e.link)
    if(e.link.substring(0,9)!='/article/'){
      //出错
      wx.showToast({
        icon:'error',
        title: "资源出错！"
      })
      return
    }
    this.getInfo()
  },
  async getInfo(){
    wx.showLoading({
      title: '请稍后',
    })
    let that = this
    wx.cloud.callFunction({
      name:"fast_dog_cloud_so",
      data:{
        type:'6-info',
        article:this.data.link,
      },
      success:res=>{
        console.log(res)
        if(res.result.code!=200){
          wx.showToast({
            icon:'error',
            title: "error！"
          })
          return
        }
        that.setData({
          article:res.result
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        that.setData({
          loading:false
        })
        wx.hideLoading()
      }
    })
  },
  copy(e){
    console.log(this.data.article.link)
    wx.setClipboardData({
			data: this.data.article.info,
			success: function () {
				wx.showToast({
					title: "链接已复制"
				})
			}
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})