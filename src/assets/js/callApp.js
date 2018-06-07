(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like,ES6
        module.exports = factory();
    } else {
        //ES5
        root.CallApp = factory();
    }
}(window,function(){
    console.log('hahha');
    // https://github.com/ztktct/callApp/blob/master/callApp.js
    return {};
}));