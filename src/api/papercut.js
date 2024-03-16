import request from '../utils/request'

export function sentBasePic(data) {
    return request({
        url: '/stylizer/picture/',
        method: 'post',
        data
    })
}