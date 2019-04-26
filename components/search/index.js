// components/search/index.js
import {KeywordModel} from "../../models/keyword";
import {BookModel} from "../../models/book";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more:{
            type:String,
            observer:'_load_more'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        dataArray: [],
        searching:false
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
        _load_more(){
            const length = this.data.dataArray.length
            bookModel.search(0,)
        },
        onCancel(event) {
            this.triggerEvent('cancel')
        },
        onDelete(event){
          this.setData({
              searching:false
          })
        },
        onConfirm(event) {
            const word = event.detail.value || event.detail.text
            this.setData({
                searching:true
            })
            bookModel.search(0, word).then(res => {
                this.setData({
                    dataArray: res.books
                })
                keywordModel.addToHistory(word)
            })
        }
    }
})
