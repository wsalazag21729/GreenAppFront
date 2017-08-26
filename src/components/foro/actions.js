import { APP_URL } from '../../constantsGlobal';
import { CONSULT_INFO_DISCUSSIONS, OPEN_CLOSE_MODAL, OPEN_CLOSE_MODAL_COMMENT, 
    SAVE_DISCUSSION, UPDATE_DISCUSSION, CONSULT_INFO_COMMENTS, SAVE_COMMENT, 
    OPEN_CLOSE_MODAL_VIEW_COMMENT, UPDATE_COMMENT } from './constants';
import axios from 'axios';

export function consultInfoDiscussions(idModule, searchFilter, dateTime) {
    const json = {
        "idModule": idModule,
        "searchFilter": searchFilter,
        "dateTime": dateTime
    }
    var request = axios.post(APP_URL + "/api/foroService/getInfoDiscussions", json);
    return {
        type: CONSULT_INFO_DISCUSSIONS,
        payload: request
    }
}

export function saveDiscussion(jsonDiscussion) {
    var request = axios.post(APP_URL + "/api/foroService/saveDiscussion", jsonDiscussion);
    return {
        type: SAVE_DISCUSSION,
        payload: request
    }
}

export function consultInfoComments(idDiscussion, searchFilter, dateTime) {
    const json = {
        "idDiscussion": idDiscussion,
        "searchFilter": searchFilter,
        "dateTime": dateTime
    }
    var request = axios.post(APP_URL + "/api/foroService/getInfoComments", json);
    return {
        type: CONSULT_INFO_COMMENTS,
        payload: request
    }
}

export function saveComment(jsonComment) {
    var request = axios.post(APP_URL + "/api/foroService/saveComment", jsonComment);
    return {
        type: SAVE_COMMENT,
        payload: request
    }
}


export function openCloseModal(value) {
    return {
        type: OPEN_CLOSE_MODAL,
        payload: value
    }
}

export function openCloseModalComment(value) {
    return {
        type: OPEN_CLOSE_MODAL_COMMENT,
        payload: value
    }
}

export function openCloseModalViewComment(value) {
    return {
        type: OPEN_CLOSE_MODAL_VIEW_COMMENT,
        payload: value
    }
}

export function setDiscussionSeleted(discussion) {
    return {
        type: UPDATE_DISCUSSION,
        payload: discussion
    }
}

export function setCommentSeleted(comment) {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}