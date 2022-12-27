// pages/source/yiso/index.js
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
    loading:true
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
  //请求云函数数据
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
        type:'4',
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
            totalPage:Math.ceil(res.result.data.total/10)
          })
        }
        that.setData({
          list:res.result.data.list,
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideLoading()
        that.setData({
          loading:false,
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
  copy(e){
    let index = e.currentTarget.dataset.index
    let child = e.currentTarget.dataset.child
    let info = this.data.list[index].url
    if(info=='[https://www.aliyundrive.com/s/E6dJ66BJvjR](https://www.aliyundrive.com/s/E6dJ66BJvjR'){
      info = 'https://www.aliyundrive.com/s/E6dJ66BJvjR'
    }
    switch(this.data.list[index].from){
      case 'ali':
        info = info+'/folder/'+this.data.list[index].fileInfos[child].fileId
        break
      case 'quark':
        info = info+'#/list/share/'+this.data.list[index].fileInfos[child].fileId
        break
    }
    wx.setClipboardData({
			data: info,
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