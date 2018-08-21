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
        // Get the parameters of link
        parameters(url){
            url = decodeURIComponent(url);
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

        param(data){
            const resultArray = [];
            const addKeyValuePair = (paths,key,value) =>{
                console.log(paths,key,value);
                value = this.isFunction( value ) ? value():( value == null ? '': value);
                return `${paths.join('')}${encodeURIComponent( key )}=${encodeURIComponent( value )}`;
                // return `${paths.join('')}${key}=${value}`;
            }
            const paramArray = (paths,data_array) => {
                data_array.forEach((item,i)=>{
                    if(typeof item !== 'object'){
                        resultArray.push(addKeyValuePair(paths,`[${i}]`,item));
                    }else{
                        const new_paths = JSON.parse(JSON.stringify(paths));
                        new_paths.push(`[${i}]`);
                        if(item.constructor.name==='Array'){
                            paramArray(new_paths,item);
                        }else if(item.constructor.name==='Object') {
                            paramObject(new_paths,item);
                        }
                    }
                });
            }
            const paramObject = (paths,data_object) =>{
                for ( const name in data_object ) {
                    if (!data_object.hasOwnProperty(name)) {
                        continue;
                    }
                    const item = data_object[name];
                    const key = paths.length>0?`[${name}]`:name;
                    if(typeof item !== 'object'){
                        resultArray.push(addKeyValuePair(paths,key,item));
                    }else{
                        const new_paths = JSON.parse(JSON.stringify(paths));
                        new_paths.push(key);
                        if(item.constructor.name==='Array'){
                            paramArray(new_paths,item);
                        }else if(item.constructor.name==='Object') {
                            paramObject(new_paths,item);
                        }
                    }
                }
            }
            if(typeof data !== 'object'){
                return data;
            }else{
                if(data.constructor.name==='Array'){
                    paramArray([],data);
                }else if(data.constructor.name==='Object') {
                    paramObject([],data);
                }
            }
            return resultArray.join("&").replace(/%20/g,"+");
        }

        byteSize(str){
            return new Blob([str]).size;
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
        isFunction(obj){
            return this.type(obj) === 'function';
        }
        isArray(obj){
            return this.type( obj ) === "array";
        }
        isObject(obj){
            return this.type( obj ) === "object";
        }
        cmp(x,y){
            if(x===y){
                return true;
            }

        }
    }
    return (new Utils());
}));
