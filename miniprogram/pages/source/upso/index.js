// pages/source/upso/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cloud:null,
    keyword:"",
    aim:'',
    page:1,
    list:[],
    activeNames: [],
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
        type:'5',
        keyword:this.data.keyword,
        page:this.data.page,
      },
      success:res=>{
        // console.log(res)
        if(res.result.code!=200){
          //出现错误
          wx.showToast({
            icon:'error',
            title: that.data.page==1?'暂无内容！':'页码过大？'
          })
          return
        }
        that.setData({
          list:res.result.data,
          activeNames: [],//关闭所有展开的页面
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideLoading()
        that.setData({
          cloud:cloud,
          loading:false
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
  input(event){
    this.setData({
      aim:event.detail
    })
  },
  jumpPage(e){
    let p = parseInt(this.data.aim)
    this.setData({
      aim:''
    })
    if(p==this.data.page){
      //
      wx.showToast({
        icon:'error',
        title: "请选其他页"
      })
      return
    }
    if(isNaN(p)||p<=0){
      wx.showToast({
        icon:'error',
        title: "页码错误！"
      })
    }else{
      this.setData({
        page:p
      })
      this.getInfo()
    }
  },
  copy(e){
    let index = e.currentTarget.dataset.index
    wx.setClipboardData({
			data: this.data.list[index].page_url,
			success: function () {
				wx.showToast({
					title: "链接已复制"
				})
			}
		})
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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