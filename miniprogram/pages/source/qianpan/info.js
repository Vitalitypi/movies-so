// pages/source/qianpan/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:'',
    from:'',
    link:'',
    title:'',
    root:'',
    des:'',
    infos:[],
    loading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {
    console.log(e)
    this.setData({
      link:e.link,
      title:e.title,
      from:e.from
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
        type:'8-info',
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
          des:res.result.des,
          infos:res.result.infos,
          root:res.result.root,
          pwd:res.result.pwd
        })
      },
      fail:err=>{
        console.log(err)
      },
      complete:()=>{
        that.setData({
          loading: false,
        })
        wx.hideLoading()
      }
    })
  },
  // 复制根url
  copy(e){
    let url = this.data.root
    if (url.indexOf('cloud.189.cn') == -1 && this.data.pwd.length > 0) {
      url = url.split('#')[0].split('?')[0].split('/folder/')[0] + '?pwd=' + this.data.pwd
    }
    wx.setClipboardData({
			data: url,
			success: function () {
				wx.showToast({
					title: "链接已复制"
				})
			}
		})
  },
  //复制pwd
  copyPwd(){
    wx.setClipboardData({
			data: this.data.pwd,
			success: function () {
				wx.showToast({
					title: "提取码已复制"
				})
			}
		})
  },
  // 复制子url--暂时未使用
  copySubUrl(e){
    console.log(e)
    let index = 0
    //根据不容云盘进行不同处理
    let pwd = this.data.pwd
    let url = this.data.root
    let link = this.data.infos[index].link
    switch(this.data.from){
      case '阿里云盘资源':
        url = url.split('#')[0].split('?')[0].split('/folder/')[0];
        url = url + '/folder/' + link;
        break
      case '百度云盘资源':
        url = url.split('#')[0].split('?')[0];
        let isPwd = false;
        url = url + '?pwd=' + pwd
    }
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