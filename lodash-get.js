// 实现lodash的get方法
// 常用于调用接口后取回包的值
function get(obj, path, defaltValue) {
    if (obj === null) {
        return defaltValue;
    }

    if (typeof path === 'string') {
        path = path.split('.');
    }

    if (path.length === 0) {
        return obj;
    }

    if (path.length === 1) {
        return obj[path[0]] === undefined ? defaltValue : obj[path[0]];
    }

    return get(obj[path[0]], path.slice(1), defaltValue);
}