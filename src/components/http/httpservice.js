import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';

promise.polyfill();

const request = (url, setting,headers) => {
    const defaultSetting = {
        url: url || '',
        setting: {
            method: 'GET',
            headers: window.CONFIG.JSON_CONFIG,
            // body: , // blob、BufferSource、FormData、URLSearchParams
            cache: 'default',
            credentials: 'include', // credentials: omit | same-origin | include
            mode: "cors",// mode: same-origin | cors | cors-with-forced-preflight | no-cors
        },
    }
    if(defaultSetting.setting.method!='GET'){
        setting.headers = window.CONFIG.FORM_CONFIG;
    }
    if(headers){
        setting.headers = headers;
    }
    let temp = Object.assign({}, defaultSetting.setting, setting);
    let Setting = {...defaultSetting, setting: temp};

    return fetch(Setting.url, Setting.setting).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                // return Promise.reject('请求失败！');
                return res.json();
            }
        });
}

const Http = {
    get: (url) => request(url,{method: 'GET'}),
    post: (url, params,headers) => request(url, {method: 'POST',body: params},headers),
    put: (url, params,headers) => request(url, {method: 'PUT',body: params},headers),
    patch: (url, params,headers) => request(url, {method: 'PATCH',body: params},headers),
    del: (url, params,headers) => request(url, {method: 'DELETE',body: params},headers),
    ajax: (url, setting,headers) => request(url,setting,headers)
}

export default Http;
