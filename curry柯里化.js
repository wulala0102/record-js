/*
柯里化是把一个多参数函数转化成一个嵌套的一元函数的过程
一个二元函数如下：

let fn = (x,y)=>x+y;

转化成柯里化函数如下：

const curry = function(fn){
    return function(x){
        return function(y){
            return fn(x,y);
        }
    }
}
let myfn = curry(fn);
console.log( myfn(1)(2) );

这是二元的写法
*/
// 这是多元的写法
function curry(fn) {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function() {
                return curriedFn(...arguments.concat(args));
            }
        } else {
            return fn(args);
        }
    }
}
