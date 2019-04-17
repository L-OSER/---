// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean
        },
        count:{
            type:Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(event) {
            // 自定义事件
            let like = this.properties.like;
            let count = this.properties.count;
            count = like ? count-1:count+1
            this.setData({
                count:count,
                like:!like
            })
            // 激活
            let behavior = this.properties.like ? 'like' : 'cancel'
            // 参数1 自定义事件名字 参数2,发送参数  参数3
            this.triggerEvent('like',{
                behavior:behavior
            },{})
        }
    }
})
