// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'images/1.jpg',
    onlineImg: 'images/big.jpg',
    canvasWidth: "0",
    canvasHeight: "0",
    url: "",
    imgInfoWidth: '',
    imgInfoHeight: '',
    imgZoom: '',//处理后的二维码图高度
    bigHeight: '', //处理后的大图高度,
    userInfo: null,
    imgList: [
      {
        url: "http://pqk5wbxg9.bkt.clouddn.com/12.jpg"
      },
      {
        url: "http://pqk5wbxg9.bkt.clouddn.com/81.jpg"
      },
      {
        url: "http://pqk5wbxg9.bkt.clouddn.com/tgy6.jpg"
      },
      {
        url: "http://pqk5wbxg9.bkt.clouddn.com/xm.jpg"
      },
      {
        url: "http://pqk5wbxg9.bkt.clouddn.com/big.jpg"
      }
    ],
    currImage: "http://pqk5wbxg9.bkt.clouddn.com/12.jpg",
    activeIndex: 0,
    nextIndex:0,
    importValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    this.data.userInfo = wx.getStorageSync('userInfo')
    console.log(this.data.userInfo)
    // 获取设备信息
    this.getSystemInfo()




  },
  createImage(){

    this.setData({
      nextIndex:2
    })
    this.getImgInfo(this.data.img).then(res => {
      let myCanvasWidth = this.data.canvasWidth
      this.setData({
        imgInfoWidth: res.width,
        imgInfoHeight: res.height,
        imgZoom: (myCanvasWidth * res.height) / res.width
      })
    })
    this.getImgInfo(this.data.currImage).then(res => {
      let myCanvasWidth = this.data.canvasWidth
      // 大图信息
      this.setData({
        bigHeight: (myCanvasWidth * res.height) / res.width
      })
      this.createCanvas(this.data.currImage)
    })
  },
  // 获取图片信息
  getImgInfo(src) {
    return new Promise((resolve) => {
      wx.getImageInfo({
        src: src,
        success: (res) => {
          resolve(res)
        }
      })
    })
  },
  //获取设备信息
  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          canvasWidth: res.screenWidth - 40,
          canvasHeight: res.windowHeight - 100
        })

      }
    })
  },
  // canvas绘画
  createCanvas(imgPath) {
    let imgUrl = this.data.img
    let canvasWidth = this.data.canvasWidth
    let bigHeight = this.data.bigHeight
    const ctx = wx.createCanvasContext('shareCanvas')
    // var screenScale = that.data.canvasWidth * 2 / 750
    ctx.drawImage(imgPath, 0, 0, canvasWidth, bigHeight)
    ctx.setFontSize(18)
    ctx.drawImage(imgUrl, 0, bigHeight - this.data.imgZoom, canvasWidth, this.data.imgZoom)

    let textLeft = canvasWidth / 2 - 100;
    let textTop = (bigHeight - this.data.imgZoom) - 100

    this.drawText(ctx, '把眼前的事情做到极致,下一秒成功的就是你', textLeft, textTop, 200);
    ctx.setFontSize(16)
    this.formaText(this.data.userInfo.nickName)
    ctx.fillStyle = "black";
    ctx.fillText('佳俊佳俊佳', canvasWidth / 2, bigHeight - this.data.imgZoom / 1.5)
    ctx.setFontSize(14)
    ctx.fillStyle = "#5f9efd";
    ctx.fillText('邀请你加入', canvasWidth / 2, (bigHeight - this.data.imgZoom / 1.5) + 25)
    ctx.draw()
    // CanvasContext.drawImage(string imageResource, number sx, number sy, number sWidth, number sHeight, number dx, number dy, number dWidth, number dHeight)
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'shareCanvas',
        success: (res) => {
          console.log(res.tempFilePath)
          this.setData({
            url: res.tempFilePath
          })
        }
      })
    }, 500);
  },

  // 处理图片比例
  matrixingImg(width, height) {
    return (this.data.canvasWidth / width) * height
  },
  // 处理文字,超过4位加省略号
  formaText(text) {
    if (text.length > 4) {
      let string = text.substring(0, 4)
      return string + '...'
    }
  },
  // 文字换行
  drawText(context, t, x, y, w) {

    var chr = t.split("");
    var temp = "";
    var row = [];

    context.fillStyle = "#fff";
    context.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {

      if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
        temp += chr[a];
      }//context.measureText(text).width  测量文本text的宽度
      else {
        row.push(temp);
        temp = chr[a];
      }
    }
    row.push(temp);

    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + (b + 1) * 24);//字体20，间隔24。类似行高
    }

    // 只显示2行，加...
    /*for(var b = 0; b < 2; b++){
        var str = row[b];
        if(b == 1){
            str = str.substring(0,str.length-1) + '...';
        }
        context.fillText(str,x,y+(b+1)*24);
    }*/
  },


  selectImage(event) {
    this.setData({
      activeIndex: event.currentTarget.dataset.index,
      currImage: event.currentTarget.dataset.url
    })
    console.log(this.data.currImage)
  },
  nextImage(){
    this.setData({
      nextIndex:++this.data.nextIndex
    })
  },
  prevImage(){
    this.setData({
      nextIndex:--this.data.nextIndex
    })
  },

  textArae(event){

    this.setData({
      importValue:event.detail.value
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