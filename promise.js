// 实现Promise的all、race、all Settled

// 判断当前值是否为promise
const isPromise = (val) => {
    val !== undefined && val !== null &&
    typeof val.then === 'function' && typeof val.catch === 'function';
}

class Promise {
    static resolve = (val) => {
        return isPromise(val) ? val : new Promise(resolve => resolve(val));
    }

    static reject = (val) => {
        return isPromise(val) ? val : new Promise((_, reject) => reject(val));
    }

    // 实现promise里的all方法
    static all = (promises) => {
        let count = 0;
        const len = promises.length;
        const resArr = [];

        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                if (isPromise(p)) {
                    // 执行后没走到resolve的话，就调用外层的reject去返回
                    p.then(res => {
                        resArr[index] = res;
                        ++count === len && resolve(resArr);
                    }, reject);
                } else {
                    // 如果当前p不是一个promise, 可以直接作为resolve的值
                    resArr[index] = p;
                    ++count === len && resolve(resArr);
                }
            })
        })
    }

    // 实现promise里的race方法
    static race = (promises) => {
        return new Promise((resolve, reject) => {
            promises.forEach((p) => {
                if (isPromise(p)) {
                    p.then(resolve, reject);
                } else {
                    resolve();
                }
            })
        })
    }

    // 实现promise里的allSettle方法
    static allSettle = (promises) => {
        const len = promises.length;
        let count = 0;
        const resArr = [];

        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                if (isPromise(p)) {
                    p.then(res => {
                        resArr[index] = res;
                        ++count === len && resolve(resArr);
                    }, err => {
                        resArr[index] = err;
                        ++count === len && reject(resArr);
                    });
                } else {
                    resArr[index] = p;
                    ++count === len && resolve(resArr);
                }
            });
        })
    }
}