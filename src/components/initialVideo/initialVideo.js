import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consultInfoModule } from './actions';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import {redirectUrl} from '../../actionsGlobal';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';
import FrameVideo from '../iframeVideo/iframeVideo';
import { get } from 'lodash';
import $ from 'jquery';

const HEIGTH_PANEL_BOTTOMS = 40;

class InitialVideo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { consultInfoModule } = this.props;
        consultInfoModule(MODULE_RECYCLING);
    }
    render() {
        const { initialVideoRecuder } = this.props;
        const linkVideo = get(initialVideoRecuder.get('infoModule'), 'linkInitialVideo', null);
        return (
            <Row>
                <ButtonsComponent/>
                <FrameVideo linkVideo={linkVideo} 
                    height={$(window).height() - HEIGTH_PANEL_BOTTOMS - 4} 
                    paddingTop={HEIGTH_PANEL_BOTTOMS}/>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoModule
    }, dispatch);
}

function mapStateToProps({ initialVideoRecuder }) {
    return { initialVideoRecuder };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialVideo);