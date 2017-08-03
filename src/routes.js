import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import initialVideo from './components/initialVideo/initialVideo';

class App extends Component {
    render() {
        return (
            <div style={{ width: "100%" }}>
                {this.props.children}
            </div>
        );
    }
}

export default (
    <Grid>
        <Redirect from="/" to="/initialVideo" />
        <Route path="/" component={App}>
            <Route path="initialVideo" component={initialVideo}></Route>
        </Route>
    </Grid>
);
