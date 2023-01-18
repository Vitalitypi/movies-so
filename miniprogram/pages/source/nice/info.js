// pages/source/nice/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    link:'',
    des:[],
    root:'',
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    this.setData({
      title:e.title,
      link:e.link
    })
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
        type:'2-info',
        share:this.data.link,
      },
      success:res=>{
        console.log(res)
        if(res.result.code!=200){
          return
        }
        that.setData({
          root:'https://www.aliyundrive.com/s/'+res.result.url,
          des:res.result.des
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        wx.hideLoading()
        that,this.setData({
          loading:false
        })
      }
    })
  },
  copy(e){
    let index = e.currentTarget.dataset.index
    let link = ''
    if(index=='root'){
      link = this.data.root
    }else{
      link = this.data.root+'/folder/'+this.data.des[index].link
    }
    wx.setClipboardData({
			data: link,
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