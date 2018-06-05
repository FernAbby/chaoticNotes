import * as ActionTypes from './ActionTypes';

export const selected_link = (link_id,category_id) => {
    return {
        type: ActionTypes.SELECTED_LINK,
        link_id: link_id,
        category_id: category_id
    };
};

export const change_category = (category_id) => {
    return {
        type: ActionTypes.CHANGE_CATEGORY,
        category_id: category_id,
    };
};

export const update_leftmenu = (leftmenu) => {
    return {
        type: ActionTypes.UPDATE_LEFTMENU,
        leftmenu: leftmenu,
    };
};