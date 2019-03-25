import {config} from "../config";

class HTTP{
    request(params){
        if (!params.method){
            params.method = 'GET'
        }
        wx.request({
            url:config.api_base_url + params.url,
            method:params.method,
            data:params.data,
            header:{
                'content-type':'application/json',
                'appkey':config.appkey
            },
            success:(res)=>{
                let code = res.statusCode.toString()
                // 判断状态码开头是否是2,
                if (code.startsWith('2')){

                } else {

                }
            },
            fail:(err)=>{

            }
        })
    }
}

export {HTTP}