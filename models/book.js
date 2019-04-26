import {HTTP} from "../util/http-p"

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    search(start, q) {
        return this.request({
            url:'book/search?summary=1',
            data:{
                q:q,
                start:start
            }
        })
    }

    getMyHotCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    // 书本详情
    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    //书本喜欢状态
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }

    //获取短评
    getComment(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

//    短评
    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}

export {BookModel}