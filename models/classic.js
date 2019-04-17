import {HTTP} from "../util/http"

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      // 获取最新一期
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index),res)
      }
    })
  }

  // 获取当前的上一期或下一期
  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          // 将请求的数据写入缓存
          wx.setStorageSync(this._getKey(res.index),res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }

  }

  // 判断是否第一个
  isFirst(index) {

    return index == 1 ? true : false
  }

  //判断是否最新一期
  isLatest(index) {
    //获取缓存中的最新期刊index
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  //缓存期刊最新index
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  // 获取缓存中的最新期刊index
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {ClassicModel}