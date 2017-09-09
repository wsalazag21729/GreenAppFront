import Immutable from 'immutable';
import * as actions from './constants';

const initialState = Immutable.Map({
    infoModule: null,
    modules: [],
    openModalChoose: false
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONSULT_INFO_MODULE:
            const moduleInfo = action.payload.data;
            return state.set("infoModule", moduleInfo);
        case actions.CONSULT_MODULES:
            const modules = action.payload.data;
            return state.set("modules", modules);
        case actions.OPEN_CLOSE_MODAL_CHOOSE:
            return state.set("openModalChoose", action.payload);
        default:
            return state;
    }
}
