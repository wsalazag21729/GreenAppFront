import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';
import { Divider } from 'semantic-ui-react';
import FrameVideo from '../iframeVideo/iframeVideo';
import { get } from 'lodash';

class Content extends Component {
    constructor(props) {
        super(props);
        this.renderDescription = this.renderDescription.bind(this);
    }

    renderDescription() {
        const { moduleContentReducer } = this.props;
        const descriptionModule = get(moduleContentReducer.get('moduleDescription'), 'moduleDescription', null);
        return <div style={{
            height: '180px', marginLeft: '7px', marginRight: '7px', overflow: 'auto',
            border: '1px solid #DCDCDC', padding: '5px', boxShadow: '0px 1px 2px 0 rgba(34, 36, 38, 0.15)'
        }}
            dangerouslySetInnerHTML={{ __html: descriptionModule }}>
        </div>;
    }

    render() {
        const { initialVideoRecuder, moduleContentReducer } = this.props;
        const linkVideo = get(moduleContentReducer.get('moduleDescription'), 'linkVideo', null);
        return (
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '15px' }}>
                <Row style={{ marginRight: '5px' }}>
                    <Col xs={4} md= {6} lg={5} style={{ width: '100%' }}>
                        <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> {window.localStorage.getItem('nameModule')} </p>
                    </Col>
                    <ButtonsComponent showBtnRed={true} showBtnGreen={true} showBtnYellow={true} showBtnBlue={true} />
                    <Col xs={12} md={12} lg={12}>
                        <Divider clearing />
                    </Col>
                    <Col xs={12} md={12} lg={12} >
                        <FrameVideo linkVideo={linkVideo} height='370px' paddingTop={0} />
                        {this.renderDescription()}
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ initialVideoRecuder, moduleContentReducer }) {
    return {
        initialVideoRecuder,
        moduleContentReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);