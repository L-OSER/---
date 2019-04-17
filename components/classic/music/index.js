// components/classic/music/index.js
import {classicBeh} from "../classic-beh";

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  observers:{
    src(newVal){
      this._monitorSwitch()
  // 用于hidden,不是销毁重建的组件方法,判断每次进入src是否相同并且是否播放状态
      if (mMgr.src !=newVal||mMgr.paused) {
        this.setData({
          playing:false
        })
      } else {
        this.setData({
          playing:true
        })
      }
    }
  },
//   wx:if才可以用,创建组件时候调用
/*  attached(){
    this._recoverStatus()
  },*/
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {

      if (!this.data.playing) {
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      } else {
        mMgr.pause()
      }
      this.setData({
        playing: !this.data.playing
      })
    },
    // 用于wx:if刚创建组件
    _recoverStatus:function () {
      if (mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if (mMgr.src ==this.properties.src) {
        this.setData({
          playing:true
        })
      }
    },

    // 监听音乐播放器
    _monitorSwitch:function () {
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
