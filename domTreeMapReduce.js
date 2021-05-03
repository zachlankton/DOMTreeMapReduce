(function DOMTreeMapReduce() {

    // This code completely stolen from James Sinclair's Blog
    // https://jrsinclair.com/articles/2019/functional-js-traversing-trees-with-recursive-reduce/
    const DOMTree = {
        reduce: curry(function reduce(reducerFn, init, node) {
            const acc = reducerFn(init, node);
            if (!hasChildren(node)) {
                return acc;
            }
            const children = node.childNodes;
            return [...children].reduce((a, x) => DOMTree.reduce(reducerFn, a, x), acc);
        }),
        map: curry(function map(fn, node) {
            node = fn(node);
            if (!hasChildren(node)) {
                return node;
            }
            [...node.children].forEach(DOMTree.map(fn));
            return node;
        })
    };

    window.DOMTree = DOMTree;
    
    function hasChildren(node) {
        return (typeof node === 'object') &&
            (typeof node.childNodes !== 'undefined') &&
            (node.childNodes.length > 0);
    }

  
    // credit for this function goes to https://javascript.info/currying-partials
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function(...args2) {
                    return curried.apply(this, args.concat(args2));
                }
            }
        };
    }
  
})();
