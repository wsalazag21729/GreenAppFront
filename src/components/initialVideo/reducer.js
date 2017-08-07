import Immutable from 'immutable';
import * as actions from './constants';

const initialState = Immutable.Map({
    infoModule: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONSULT_INFO_MODULE:
            const module = action.payload.data;
            return state.set("infoModule", module);
        default:
            return state;
    }
}
