import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware, combineEpics } from 'redux-observable';
import rootReducer from '../reducers';
import ReduxPromise from 'redux-promise';
import DevTools from '../components/devTools/component';
import {inputEventsEpic} from '../components/timeout/timeoutDucks';

const epics = combineEpics(inputEventsEpic);
const epicMiddleware = createEpicMiddleware(epics);

const finalCreateStore = compose(
  applyMiddleware(ReduxPromise, epicMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(state) {
    const store = finalCreateStore(rootReducer, state);
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(require('../reducers'))
        );
    }
    return store;
}
