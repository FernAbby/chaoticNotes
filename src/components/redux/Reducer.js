import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {

    const {link_id,category_id,leftmenu} = action;

    switch (action.type) {

        case ActionTypes.SELECTED_LINK:
            return {...state, leftmenu:{...leftmenu,link_id: link_id}};

        case ActionTypes.CHANGE_CATEGORY:
            return {...state, leftmenu:{...leftmenu,category_id: category_id}};

        case ActionTypes.UPDATE_LEFTMENU:
            return {...state, leftmenu: leftmenu};

        default:
            return state
    }

}