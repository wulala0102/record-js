// 深拷贝
// 注意以下：
// 1. 不要循环引用，不发生内存泄露
// 2. 设置缓存
// 3. 特殊数据类型的处理

function deepclone(obj, cache = new Map()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (cache.has(obj)) {
        return cache[obj];
    }

    const constructor = obj.constructor;
    let newObj;

    switch(constructor) {
        case RegExp:
            newObj = new constructor(obj);
            break;
        case Date:
            newObj = new constructor(obj.getTime());
            break;
        case Error:
            newObj = Object.create(constructor);
            break;
        default:
            newObj = new constructor();
    }

    // 加入缓存
    cache.set(obj, newObj);

    for (const key in obj) {
        if (Object.prototype.getOwnProperty.call(obj, key)) {
            newObj[key] = deepclone(obj[key], cache)
        }
    }
}