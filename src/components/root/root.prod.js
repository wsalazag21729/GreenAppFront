import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {Router} from 'react-router';

export default class Root extends Component {
    render() {
        const { store, browserHistory, routes } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={browserHistory} routes={routes}/>
                </div>
            </Provider>
        );
    }
}
