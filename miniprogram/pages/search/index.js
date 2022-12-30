// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:[],
    functions:['影视','资料','网盘','教程','考试'],
    value:'',
    current:4,
    // engine:'1、默认引擎（速度较快）',
    engines: ['1、资源简单（速度快）', '2、阿里盘搜（不推荐）', '3、电报（tg）搜索', '4、影视资源较多', '5、考试资源为主','6、学习资源较多','7、资源较为综合','8、优质资源（推荐）'],
    show:false,
    textShow:false,
    pages:['small','nice','qianfan','yiso','upso','xueso','zhaoso','qianpan'],
    engineChanged:false,//记录搜索引擎是否变化
  },
  openText(){
    this.setData({
      textShow:true
    })
  },
  closeText(){
    this.setData({
      textShow:false
    })
  },
  onConfirm(event) {
    this.setData({
      current:event.detail.index+1,
      show:false,
      engineChanged:true
    })
  },
  onCancel() {
    this.setData({
      show:false
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(e){
    this.setData({
      value:e.detail
    })
  },
  onSearch(e){
    if(this.data.value.length==0){
      return
    }
    if(this.data.engineChanged){
      this.setData({
        engineChanged:false
      })
      // 写入本地缓存,记录上次选择的引擎
      wx.setStorageSync('engine', this.data.current);
    }
    let keyword = this.data.value
    this.setData({
      value:''
    })
    let page = this.data.pages[this.data.current-1]
    wx.navigateTo({
      url: '../source/'+page+'/index?keyword='+keyword,
    })
  },
  copy(e){
    wx.setClipboardData({
			data: 'FastDogging',
			success: function () {
				wx.showToast({
					title: "微信已复制"
				})
			}
		})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let index = wx.getStorageSync('engine')
    if(index>0){
      this.setData({
        current:index
      })
    }
    // console.log(Math.floor(Math.random()*100)+1)
    // this.loadInfo()
  },
  async loadInfo(){
    const app = getApp()
    let cloud = app.globalData['cloud']
    await cloud.callFunction({
      name:"getTop",
      data:'',
      success:res=>{
        console.log(res.result)
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