import { APP_URL } from '../../constantsGlobal';
import { CONSULT_INFO_MODULE, CONSULT_MODULES, OPEN_CLOSE_MODAL_CHOOSE} from './constants';
import axios from 'axios';

export function consultInfoModule(name) {
    var request = axios.post(APP_URL + "/api/moduleService/getInfoModule", name);
    return {
        type: CONSULT_INFO_MODULE,
        payload: request
    }
}

export function consultAllModules() {
    var request = axios.post(APP_URL + "/api/moduleService/getModules");
    return {
        type: CONSULT_MODULES,
        payload: request
    }
}

export function openCloseModalChoose(value) {
    return {
        type: OPEN_CLOSE_MODAL_CHOOSE,
        payload: value
    }
}
