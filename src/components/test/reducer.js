import Immutable from 'immutable';
import { isNull, clone, concat, sortBy } from 'lodash';
import * as actions from './constants';

const initialState = Immutable.Map({
    listImages: [],
    madePlays: 0,
    rightPlays: 0,
    failedPlays: 0,
    listIdsImagesMounted: [],
    idImageEvaluated: null,
    idxItemSeleted: null,
    idxItemSeletedTemporary: null,
    count: 0
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.CONSULT_IMAGES_MODULE:
            const listImages = action.payload.data;
            if (!isNull(listImages)) {
                const listImagesClone = clone(listImages);
                const finalList = concat(listImages, listImagesClone);
                return state.set("listImages", finalList.shuffle());
            } else {
                return state.set("listImages", []);
            }
        case actions.ALTER_INFO_PLAYS:
            const { nameTypePlay, value } = action;
            return state.set(nameTypePlay, value);
        case actions.SET_COUNT:
            return state.set("count", action.value);
        case actions.SET_ID_IMAGE_EVALUATED:
            return state.set("idImageEvaluated", action.value);
        case actions.SET_IDX_ITEM_SELETED:
            return state.set("idxItemSeleted", action.value);
        case actions.SET_IDX_ITEM_SELETED_TEMPORARY:
            return state.set("idxItemSeletedTemporary", action.value);
        case actions.IMAGE_DICOVERED:
            const listImagesMounted = state.get('listIdsImagesMounted');
            listImagesMounted.push(action.idImage);
            return state.set("listIdsImagesMounted", listImagesMounted);
        case actions.CLEAR_COUNTERS:
            return state.withMutations(map => {
                map
                    .set('madePlays', 0)
                    .set('rightPlays', 0)
                    .set('failedPlays', 0)
                    .set('listImages', state.get('listImages').shuffle())
                    .set('listIdsImagesMounted', []);
            });
        default:
            return state;
    }
}


Array.prototype.shuffle = function () {
    for (var i = this.length - 1; i > 0; i--) {
        var j = Math.floor(i * Math.random());
        var tmp = this[j];
        this[j] = this[i];
        this[i] = tmp;
    }
    return this;
}