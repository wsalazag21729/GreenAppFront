import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import { redirectUrl } from '../../actionsGlobal';
import { get } from 'lodash';
import $ from 'jquery';

class FrameVideo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { linkVideo, height, paddingTop } = this.props;
        return (
            <Col xs={12} md={12} lg={12} style={{ paddingTop: paddingTop }}>
                <iframe style={{ "width": "100%", "height": height, "overflow": "scroll" }} src={linkVideo + '?rel=0&amp;showinfo=0'}></iframe>
            </Col>
        );
    }
}

export default FrameVideo;