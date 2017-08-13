import Immutable from 'immutable';
import * as actions from './constants';

const initialState = Immutable.Map({
    listInfoDiscussions: null,
    openModal: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONSULT_INFO_DISCUSSIONS:
            const infoDiscussions = action.payload.data;
            return state.set("listInfoDiscussions", infoDiscussions);
        case actions.OPEN_CLOSE_MODAL:
            return state.set("openModal", action.payload);
        default:
            return state;
    }
}
