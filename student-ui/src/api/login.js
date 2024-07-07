import request from '@/utils/request'

// 封装发送 GET 请求的函数
export function Login(data) {
    return request({
        url: 'jhs/login',
        method: 'post',
        data: data,
        headers: {
            isToken: false
        },
        timeout: 20000
    });
}


export function Logout() {
    return request({
        url: 'jhs/logout',
        method: 'post',
        headers: {
            isToken: false
        },
        timeout: 20000
    });
}





