const fs = require('fs');
const querystring = require('querystring');
var Config = {};

try{
    Config = fs.readFileSync('./.env', 'utf8');
}catch(err){
    Config = undefined;
}
var result = querystring.parse(Config.replace(/\r\n+/g,"&").replace(/\s+/g,""));
module.exports = result;
