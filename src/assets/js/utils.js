(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like,ES6
        module.exports = factory();
    } else {
        //ES5
        root.Utils = factory();
    }
}(window,function(){
    class Utils {
        constructor(){

        }

        isEmptyObject(obj){
            for(const name in obj){
                return false;
            }
            return true;
        }

        params(url){
            if(url&&url.indexOf('?')>-1){
                const params = {};
                const paramsArray = url.split('?')[1].split('&');
                for(const item of paramsArray){
                    const itemArray = item.split('=');
                    params[itemArray[0]] = itemArray[1];
                }
                return params;
            }
            return {};
        }

        serialize(data){
            if(typeof data !== 'object'){
                return data;
            }
            // const $this = arguments.callee;
            if(data.constructor.name==='Array') {
               return this.serializeArray('',data);
            }else if(data.constructor.name==='Object'){
               return this.serializeObject(data);
            }
        }
        serializeArray(array_name,data){
            const buffer = [];
            data.forEach((item,i)=>{
                const name = `${array_name}[${i}]`;
                buffer.push(
                    `${encodeURIComponent(name)}=${encodeURIComponent(item||'')}`
                );
            });
            const source = buffer.join("&").replace(/%20/g,"+");
            return source;
        }

        serializeObject(data) {
            const buffer = [];
            for ( const name in data ) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                buffer.push(
                    encodeURIComponent(name) + "=" + encodeURIComponent(data[name]||'')
                );
            }
            // Serialize the buffer and clean it up for transportation.
            const source = buffer.join("&").replace(/%20/g,"+");
            return source;
        }
        bubbleSort(){
            var array = [9, 8, 7, 6, 5, 4, 3, 2, 1], temp;
            for(var i=0,len=array.length;i<len;i++){
                for(var j = i; j<len;j++){
                    if(array[i]>array[j]){
                        temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }
                }
            }
        }
        deepClone(data){
            if(typeof data !== 'object'){
                return data;
            }
            let result = null;
            if(data.constructor.name === 'Array'){
                result = [];
                data.forEach((item,i)=>{
                    result.push(this.deepClone(item));
                });
            }else if(data.constructor.name === 'Object'){
                result = {};
                for(const name in data){
                    result[name] = this.deepClone(data[name]);
                }
            }
            return result;
        }
        type(obj) {
            const toString = Object.prototype.toString;
            const map = {
                '[object Boolean]' : 'boolean',
                '[object Number]'  : 'number',
                '[object String]'  : 'string',
                '[object Function]' : 'function',
                '[object Array]'  : 'array',
                '[object Date]'   : 'date',
                '[object RegExp]'  : 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]'   : 'null',
                '[object Object]'  : 'object'
            };
            // Object.prototype.toString.call(document.getElementsByTagName('div')[0]) [object HTMLDivElement]
            if(obj instanceof Element) {
                return 'element';
            }
            return map[toString.call(obj)];
        }
    }
    return (new Utils());
}));
