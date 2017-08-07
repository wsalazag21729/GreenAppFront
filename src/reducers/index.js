import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import initialVideoRecuder from '../components/initialVideo/reducer';
import moduleContentReducer from '../components/moduleContent/reducer';

export default combineReducers({
    routing: routerReducer,
    initialVideoRecuder,
    moduleContentReducer
});
