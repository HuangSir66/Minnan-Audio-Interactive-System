import request from '../utils/request'

export function sentBaseVio(data) {
    return request({
        url: '/stylizer/vidio/',
        method: 'post',
        data
    })
}

export function sentBaseOld(data){
    return request({
        url:"/stylizer/oldimage/",
        method:'post',
        data
    })
}

export function sentClothImg(data){
    return request({
        url:"/stylizer/clothing/",
        method:"post",
        data
    })
}

export function sentMusic(data){
    return request({
        url:"/stylizer/music/",
        method:"post",
        data,
        responseType: "blob",
    })
}

export function sentPuppet(data){
    return request({
        url:'/stylizer/puppet/',
        method:"post",
        data
    })
}