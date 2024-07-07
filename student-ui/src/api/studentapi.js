import request from '@/utils/request'

// 封装发送 GET 请求的函数，学生信息分页查询
export function getStudentInfodata(params) {
    const { page, pageSize, keyName, beginSchoolDate, endSchoolDate, socialPresence } = params;
    const url = `stu/page?page=${page}&pageSize=${pageSize}&keyName=${keyName}&beginSchoolDate=${beginSchoolDate}&endSchoolDate=${endSchoolDate}&socialPresence=${socialPresence}`;

    return request({
        url: url,
        method: 'get',
        timeout: 20000
    });
}
//数据回写，根据id查询学校信息
export function getStudentInfoById(id) {

    const url = `/stu/${id}`;
    return request({
        url: url,
        method: 'get',
        timeout: 20000
    });
}


