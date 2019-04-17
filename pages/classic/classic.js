import {ClassicModel} from "../../models/classic";
import {LikeModel} from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()


// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeStatus:false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /*   http.request({
           url:'classic/latest',
           success:(res)=>{
             console.log(res)
           }
       })*/
    // 获取最新一期接口
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })

  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },

  // 下一期
  onNext() {
    this._updateClassic('next')
  },
  // 上一期
  // type: 期刊类型,这里的类型分为:100 电影 200 音乐 300 句子
  onPrevious() {
    this._updateClassic('previous')
  },

  //私有方法,判断获取上下期 nextOrPrevious
  _updateClassic(nextOrPrevious) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type)
      // console.log(res)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  // 获取点赞数
  _getLikeStatus:function(artID,category){
    likeModel.getClassicLikeStatus(artID,category,(res)=>{
        this.setData({
          likeCount:res.fav_nums,
          likeStatus:res.like_status
        })
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