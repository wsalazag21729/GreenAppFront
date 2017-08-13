import { APP_URL } from '../../constantsGlobal';
import { CONSULT_INFO_DISCUSSIONS, OPEN_CLOSE_MODAL, SAVE_DISCUSSION } from './constants';
import axios from 'axios';

export function consultInfoDiscussions(idModule) {
    var request = axios.post(APP_URL + "/api/foroService/getInfoDiscussions", idModule);
    return {
        type: CONSULT_INFO_DISCUSSIONS,
        payload: request
    }
}

export function saveDiscussion(jsonDiscussion){
    var request = axios.post(APP_URL + "/api/foroService/saveDiscussion", jsonDiscussion);
    return {
        type: SAVE_DISCUSSION,
        payload: request
    }
}

export function openCloseModal(value){
    return {
        type: OPEN_CLOSE_MODAL,
        payload: value
    }
}