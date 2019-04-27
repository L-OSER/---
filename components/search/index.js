// components/search/index.js
import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";

import {paginationBev} from "../behaviors/pagination";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },
  // 类似vue mixin
  behaviors: [paginationBev],
  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    searchValue: '',
    loading: false,
    loadingCenter: false
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      // 如果搜索没值和正在请求
      if (!this.data.searchValue || this._isLocked()) {
        return
      }
      if (this.hasMore()) {
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.searchValue).then(res => {
          this.setMoreData(res.books)
          this._unLocked()
        }, () => {
          // 请求失败也是要解锁
          this._unLocked()
        })
      }
    },

    // 判断是否上锁
    _isLocked() {
      return this.data.loading ? true : false
    },

    // 上锁
    _locked() {
      this.setData({
        loading: true
      })
    },

    // 解锁

    _unLocked() {
      this.setData({
        loading: false
      })
    },

    // 发送取消事件
    onCancel(event) {
      this.triggerEvent('cancel')
    },
    onDelete(event) {
      this._closeResult()
    },
    onConfirm(event) {
      // 获取搜索名称
      const word = event.detail.value || event.detail.text;
      // 显示搜索结果
      this._showResult()

      //初始化loading位置
      this._showLoadingCenter()

      // 初始化数组
      this.initialize()
      bookModel.search(0, word).then(res => {
        // 合并滚动数组
        this.setMoreData(res.books)
        // 设置总长度
        this.setTotal(res.total)
        this.setData({
          searchValue: word
        })

        // 添加历史搜索
        keywordModel.addToHistory(word)

        this._hideLoadingCenter()
      })
    },

    //现实中间loading
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    //隐藏中间loading
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    // 显示搜索结果
    _showResult() {
      this.setData({
        searching: true
      })
    },

    // 隐藏搜索结果
    _closeResult() {
      this.setData({
        searching: false
      })
    }
  }
})
