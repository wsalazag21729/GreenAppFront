import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import initialVideo from './components/initialVideo/initialVideo';
import moduleContent from './components/moduleContent/moduleContent';
import content from './components/content/content';
import foro from './components/foro/foro';
import test from './components/test/test';

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
            <Route path="moduleContent" component={moduleContent}>
                <Route path="content" component={content}></Route>
                <Route path="foro" component={foro}></Route>
                <Route path="test" component={test}></Route>
            </Route>
        </Route>
    </Grid>
);
