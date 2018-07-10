const fs = require('fs');
const querystring = require('querystring');
let Config = {};

try{
    Config = fs.readFileSync('./.env.development', 'utf8');
}catch(err){
    Config = undefined;
}
var result = querystring.parse(Config.replace(/\r\n+/g,"&").replace(/\s+/g,""));
function upperObjectKey(obj){
    for (var key in obj){
        obj[key.toLocaleUpperCase()] = obj[key];
        delete(obj[key]);
    }
    return obj;
}
result = upperObjectKey(result);
module.exports = result;
