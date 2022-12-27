// pages/source/small/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cloud:null,
    keyword:"",
    loading: true,
    list:[],
    activeNames: [],

  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  copy(e){
    let index = e.currentTarget.dataset.index
    wx.setClipboardData({
			data: 'https://www.aliyundrive.com/s/'+this.data.list[index].key,
			success: function () {
				wx.showToast({
					title: "链接已复制"
				})
			}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      keyword:e.keyword
    })
    //开始进行请求数据
    this.getGitCafe()
  },
  getGitCafe:function(e){
    wx.showLoading({
      title: '请稍后',
    })
    let that = this
    wx.request({
      url: 'https://gitcafe.net/tool/alipaper/', //仅为示例，并非真实的接口地址
      data: {
        'action': 'search',
        'keyword': this.data.keyword
      },
      method:'POST',
      header: {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://u.gitcafe.net',
        'Pragma': 'no-cache',
        'Referer': 'https://u.gitcafe.net/',
      },
      success (res) {
        console.log(res)
        if(res.statusCode==200){
          that.setData({
            list:res.data
          })
        }else{
          wx.showToast({
            title: '未知错误！',
            icon:"error"
          })
        }
      },
      fail:err=>{
        console.log(err)
        wx.showToast({
          title: '未知错误！',
          icon:"error"
        })
      },
      complete:()=>{
        that.setData({
          loading: false,
        })
        wx.hideLoading()
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