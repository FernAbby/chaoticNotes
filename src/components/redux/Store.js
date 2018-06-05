import { createStore } from 'redux';
import Reducer from './Reducer';

const initValue = {
    leftmenu: {
        menus: {
            title: '管控平台',
            list: []
        },
        link_id: 0,
        category_id: 0
    }
};

const store = createStore(Reducer, initValue);

export default store;