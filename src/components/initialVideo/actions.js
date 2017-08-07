import { APP_URL } from '../../constantsGlobal';
import { CONSULT_INFO_MODULE } from './constants';
import axios from 'axios';

export function consultInfoModule(name) {
    var request = axios.post(APP_URL + "/api/moduleService/getInfoModule", name);
    return {
        type: CONSULT_INFO_MODULE,
        payload: request
    }
}

