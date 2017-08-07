import { APP_URL } from '../../constantsGlobal';
import { GET_INFO_DESCRIPTION_MODULE } from './constants';
import axios from 'axios';

export function consultInfoDescriptionModule(idModule) {
    var request = axios.post(APP_URL + "/api/moduleService/getInfoModuleDescription", idModule);
    return {
        type: GET_INFO_DESCRIPTION_MODULE,
        payload: request
    }
}
