import { createStore } from 'redux';
import Reducer from './Reducer';

const initValue = {
    leftmenu: {
        menus: {
            title: '策划指挥系统',
            list: []
        },
        link_id: 0,
        category_id: 0
    },
    paths: []
};

const store = createStore(Reducer, initValue);

export default store;