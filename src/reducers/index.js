import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initialVideoRecuder from '../components/initialVideo/reducer';
import moduleContentReducer from '../components/moduleContent/reducer';
import foroReducer from '../components/foro/reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    initialVideoRecuder,
    moduleContentReducer,
    foroReducer,
    form: formReducer
});
