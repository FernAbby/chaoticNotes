import Http from './httpservice';
import {Interface,cookieJson} from './interface';

const Request = window.Request || {};
//获取菜单列表
Request.GetMenuList = (callback) => {
    Http.get(Interface.LEFT_MENU).then((data)=>{
        callback(data);
    }).catch((error)=>{
        callback(error);
    });
}
//获取选题列表
Request.GetTopicList = (callback) => {
    Http.get(Interface.TOPIC_LIST).then((data)=>{
        callback(data);
        if(data.code!==10000){

        }
    }).catch((error)=>{
        callback(error);
    });
}

export {Http,Interface,Request,cookieJson}

