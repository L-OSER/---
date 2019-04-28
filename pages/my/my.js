// pages/my/my.js
import {BookModel} from "../../models/book";
import {ClassicModel} from "../../models/classic";

const classicModel = new ClassicModel()
const bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorized: false,
        userInfo: null,
        bookCount:0,
        classics:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.login({
            success:(res)=>{
                console.log(res)
        }
        })
        this.getMyBooCount()
        this.userAuthorized()
        this.getMyFavor()
        // 用户授权了才会成功返回数据
        /*   wx.getUserInfo({
               success:(data)=>{
                   console.log(data)
               }
           })*/
    },
    // 喜欢总数
    getMyBooCount(){
        bookModel.getMyHotCount().then(res=>{
            this.setData({
                bookCount:res.count
            })
        })
    },

    getMyFavor(){
      classicModel.getMyFavor(res=>{
            this.setData({
                classics:res
            })
      })
    },

    //用户是否授权
    userAuthorized() {
        wx.getSetting({
            success: data => {
                // 如果授权过
                if (data.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (data) => {
                            console.log(data)
                            this.setData({
                                authorized: true,
                                userInfo:data.userInfo
                            })
                        }
                    })
                } else {
                    console.log('err')
                }
            }
        })

    },

    getUserInfo(event) {
        console.log(event)
    },

    onGetUserInfo(event) {
        const userInfo = event.detail.userInfo
        if (userInfo) {
            this.setData({
                userInfo,
                authorized:true
            })
            console.log(userInfo)
        }
    },

    onJumpToAbout(event){
      wx.navigateTo({
          url:'/pages/about/about'
      })
    },

    onStudy(event){
        wx.navigateTo({
            url:'/pages/course/course'
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