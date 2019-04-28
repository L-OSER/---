// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'images/1.jpg',
      canvasWidth:"0",
      canvasHeight:"0",
      url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      wx.getSystemInfo({
          success: function(res) {
            let myCanvasWidth = res.screenWidth  - 30
            let myCanvasHeight = res.windowHeight - 100
              that.setData({
                  canvasWidth: myCanvasWidth,
                  canvasHeight: myCanvasHeight
              })

          }
      })

    let imgUrl = this.data.img
      let myCanvasHeight = this.data.canvasHeight
      let myCanvasWidth = this.data.canvasWidth
      wx.getImageInfo({
          src: 'https://img.zcool.cn/community/01411c5cb2ebbaa801208f8b92aabf.jpg@1280w_1l_2o_100sh.jpg',
          success(res) {
              const ctx = wx.createCanvasContext('shareCanvas')
              let zoom = res.width/res.height
              var  a = myCanvasWidth*0.34
              console.log(myCanvasWidth,a)
              var screenScale = that.data.canvasWidth * 2 / 750
              ctx.drawImage(res.path, 0, 0, myCanvasWidth, myCanvasHeight*zoom)
              ctx.setFontSize(16)
              ctx.fillText('Hellollollollollollollollollollollollollollo', screenScale, 20)
              ctx.drawImage(imgUrl, 0, myCanvasHeight-(myCanvasWidth*0.34), myCanvasWidth, myCanvasWidth*0.34)
              ctx.fillText('佳俊邀请你加入', myCanvasWidth/2, myCanvasHeight-(myCanvasWidth*0.34)/1.5)
              ctx.draw()
             // CanvasContext.drawImage(string imageResource, number sx, number sy, number sWidth, number sHeight, number dx, number dy, number dWidth, number dHeight)
              setTimeout(() => {
                  wx.canvasToTempFilePath({
                      x: 0,
                      y: 0,
                      canvasId: 'shareCanvas',
                      success(res) {
                          console.log(res.tempFilePath)
                          that.setData({
                              url:res.tempFilePath
                          })
                      }
                  })
              }, 500);


          }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})