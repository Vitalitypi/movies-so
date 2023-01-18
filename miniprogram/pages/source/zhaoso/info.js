// pages/source/zhaoso/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:'',
    title:'',
    article:'',
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      link:e.link,
      title:e.title
    })
    console.log(e.link)
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
        type:'7-info',
        link:this.data.link,
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
        wx.hideLoading()
        that.setData({
          loading:false
        })
      }
    })
  },
  copy(e){
    wx.setClipboardData({
			data: this.data.article.link,
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