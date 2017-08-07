import Immutable from 'immutable';
import * as actions from './constants';

const initialState = Immutable.Map({
    moduleDescription: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_INFO_DESCRIPTION_MODULE:
            const moduleDescription = action.payload.data;
            return state.set("moduleDescription", moduleDescription);
        default:
            return state;
    }
}
