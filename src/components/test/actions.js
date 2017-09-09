import { APP_URL } from '../../constantsGlobal';
import { ALTER_INFO_PLAYS, CLEAR_COUNTERS, CONSULT_IMAGES_MODULE, IMAGE_DICOVERED, 
    SET_COUNT, SET_ID_IMAGE_EVALUATED, SET_IDX_ITEM_SELETED, SET_IDX_ITEM_SELETED_TEMPORARY } from './constants';
import axios from 'axios';

export function consultImagesModule(idModule) {
    var request = axios.post(APP_URL + "/api/moduleService/getImagesByModule", idModule);
    return {
        type: CONSULT_IMAGES_MODULE,
        payload: request
    }
}

export function alterPlaysTest(nameTypePlay, value){
    return {
        type: ALTER_INFO_PLAYS,
        nameTypePlay,
        value
    }
}

export function clearCounters(){
    return {
        type: CLEAR_COUNTERS
    }
}

export function discoverImage(idImage){
    return {
        type: IMAGE_DICOVERED,
        idImage
    }
}

export function setCount(value){
    return {
        type: SET_COUNT,
        value
    }
}

export function setIdImageEvaluated(value){
    return {
        type: SET_ID_IMAGE_EVALUATED,
        value
    }
}

export function setIdxItemSeleted(value){
    return {
        type: SET_IDX_ITEM_SELETED,
        value
    }
}


export function setIdxItemSeletedTemporary(value){
    return {
        type: SET_IDX_ITEM_SELETED_TEMPORARY,
        value
    }
}