const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
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

        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult:true
                })
            }
        },

        //  是否有更多的数据加载
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            }
            return true
        },

        // 初始化
        initialize() {
            this.setData({
                dataArray: [],
                noneResult:false,
                total: null,
                loading:false
            })
        },

        // 判断是否上锁
        isLocked() {
            return this.data.loading ? true : false
        },

        // 上锁
        locked() {
            this.setData({
                loading: true
            })
        },

        // 解锁

        unLocked() {
            this.setData({
                loading: false
            })
        }
    }
})

export {paginationBev}