App({
  onLaunch:function(){
      wx.getSetting({
          success: data => {
              // 如果授权过
              if (data.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                      success: (data) => {
                          console.log(data)


                          wx.setStorageSync('userInfo',data.userInfo)
                          wx.setStorageSync('authorized',true)
                      }
                  })
              } else {
                  wx.setStorageSync('authorized',false)
              }
          }
      })
  }
})