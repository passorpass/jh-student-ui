
//格式化Mon Feb 01 2021 00:00:00 GMT 0800 (中国标准时间)(String)这种日期
export function parseTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
