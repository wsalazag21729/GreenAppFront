import * as constants from './constantsGlobal';
import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';
import Router from './historyRouter';

const productionUse = process.env.NODE_ENV === 'production';

export function redirectUrl(url) {
    const urlToPush = _.startsWith(url, '/') && productionUse ? url.substr(1) : url;
    Router.push(urlToPush);
    return {
        sessionToken: url
    }
}

export function _clickBack() {
    redirectUrl("/initialVideo");
}

export function _clickForo() {
    redirectUrl("/moduleContent/foro");
}

export function _clickMenu() {
    redirectUrl("/moduleContent/content");
}

export function _clickEnter() {
    redirectUrl("/moduleContent/content");
}