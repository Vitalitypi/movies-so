// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    newsInfo:'',
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      keyword:e.keyword
    })
    this.getNewsInfo(e.keyword)
    wx.setNavigationBarTitle({
      title: e.keyword,
    })
  },
  getNewsInfo(keyword){
    let that = this
    wx.showLoading({
      title: '请稍后',
    })
    wx.cloud.callFunction({
      name:"getTops",
      data:{
        type:'weiboInfo',
        keyword:keyword
      },
      success:res=>{
        console.log(res)
        this.setData({
          newsInfo:res.result
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideLoading()
        that.setData({
          loading:false,
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