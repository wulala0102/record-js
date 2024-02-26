// 只使用curTime lastTime
// 使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行
function throttle(fn, delay) {
    let lastTime = Date.now();

    return function(...args) {
        let curTime = Date.now();

        if (curTime - lastTime > delay) {
            fn.apply(this, args);
            lastTime = Date.now();
        }
    }
}

// 使用setTimeout
// 使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
function throttle(fn, delay) {
    let timeout = null;

    return function(...args) {
        if(!timeout) {
            timeout = setTimeout(() => {
                fn.apply(this, args);
                timeout = null;
            }, delay);
        }
    }
}

// 结合二者实现更加精确的防抖
function throttle(fn, delay) {
    let timeout = null;
    let startTime = Date.now();

    return function(...args) {
        let curTime = Date.now();
        const remainTime = delay - (curTime - startTime);

        const context = this;
        const arguments = args;
        if (remainTime <= 0) {
            fn.apply(context, arguments);
            startTime = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn.apply(context, arguments);
            }, remainTime);
        }
    }
}