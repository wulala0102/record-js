function debounce(fn, delay) {
    let timeout = null;
    return function(...args) {
        clearTimeout(timeout);
        const context = this;
        
        timeout = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}