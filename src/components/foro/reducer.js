import Immutable from 'immutable';
import * as actions from './constants';

const initialState = Immutable.Map({
    listInfoDiscussions: null,
    listInfoComments: null,
    openModal: false,
    openModalComment: false,
    openModalViewComment: false,
    discussionSeleted: null,
    commentSeleted: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONSULT_INFO_DISCUSSIONS:
            const infoDiscussions = action.payload.data;
            return state.set("listInfoDiscussions", infoDiscussions);
        case actions.CONSULT_INFO_COMMENTS:
            const infoComments = action.payload.data;
            return state.set("listInfoComments", infoComments);
        case actions.OPEN_CLOSE_MODAL:
            return state.set("openModal", action.payload);
        case actions.OPEN_CLOSE_MODAL_COMMENT:
            return state.set("openModalComment", action.payload);
        case actions.OPEN_CLOSE_MODAL_VIEW_COMMENT:
            return state.set("openModalViewComment", action.payload);
        case actions.UPDATE_DISCUSSION:
            return state.set("discussionSeleted", action.payload);
        case actions.UPDATE_COMMENT:
            return state.set("commentSeleted", action.payload);
        default:
            return state;
    }
}
