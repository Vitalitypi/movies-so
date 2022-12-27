// pages/source/qianpan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cloud:null,
    keyword:"",
    totalPage:1,
    page:1,
    list:[],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      keyword:e.keyword
    })
    //开始进行请求数据
    this.getInfo()
  },
  async getInfo(){
    wx.showLoading({
      title: '请稍后',
    })
    const app = getApp()
    let cloud = app.globalData['cloud']
    let that = this
    // 完成后正常使用资源方的已授权的云资源
    await cloud.callFunction({
      name:"fast_dog_cloud_so",
      data:{
        type:'8',
        keyword:this.data.keyword,
        page:this.data.page,
      },
      success:res=>{
        console.log(res)
        if(res.result.code!=200){
          //出现错误
          wx.showToast({
            icon:'error',
            title: "error！"
          })
          return
        }
        if(that.data.page==1){
          that.setData({
            totalPage:res.result.pages
          })
        }
        that.setData({
          list:res.result.infos,
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideLoading()
        that.setData({
          loading: false,
          cloud:cloud
        })
      }
    })
  },
  getNewPage(e){
    let sign = e.currentTarget.dataset.sign
    let page = this.data.page
    switch(sign){
      case 'head':
        this.setData({
          page:1
        })
        break
      case 'last':
        this.setData({
          page:this.data.totalPage
        })
        break
      case 'prev':
        console.log('prev')
        this.setData({
          page:page-1
        })
        break
      case 'next':
        console.log('next')
        this.setData({
          page:page+1
        })
        break
    }
    console.log(this.data.page)
    this.getInfo()
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