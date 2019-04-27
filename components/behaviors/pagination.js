const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    //返回起始的记录数
    getCurrentStart() {
      return this.data.dataArray.length
    },
    
    setTotal(total){
      this.data.total = total
    },
    
    //  是否有更多的数据加载
    hasMore() {
      if (this.data.dataArray.length >= this.data.total){
        return false
      }
      return true
    },

    initialize() {
      this.setData({
        dataArray: [],
        total: null
      })
    }
  }
})

export {paginationBev}