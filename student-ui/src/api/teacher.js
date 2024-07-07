import request from '@/utils/request'

// 封装发送 GET 请求的函数，老师信息分页查询
export function getTeacherInfodata(params) {
    const { page, pageSize, keyName, btime, etime, status } = params;
    const url = `teach/page?page=${page}&pageSize=${pageSize}&keyName=${keyName}&btime=${btime}&etime=${etime}&status=${status}`;
    return request({
        url: url,
        method: 'get',
        timeout: 20000
    });
}

