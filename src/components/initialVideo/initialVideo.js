import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consultInfoModule, openCloseModalChoose, consultAllModules } from './actions';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import { redirectUrl } from '../../actionsGlobal';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';
import FrameVideo from '../iframeVideo/iframeVideo';
import ModalChooseModule from './modalChooseModule/modalChooseModule';
import { get } from 'lodash';
import $ from 'jquery';

const HEIGTH_PANEL_BOTTOMS = 10;

class InitialVideo extends Component {
    constructor(props) {
        super(props);
        this._eventButtonInContent = this._eventButtonInContent.bind(this);
    }

    componentWillMount() {
        const { consultInfoModule } = this.props;
        consultInfoModule(MODULE_RECYCLING);
    }

    _eventButtonInContent() {
        const { consultAllModules, openCloseModalChoose } = this.props;
        consultAllModules().then((data) => {
            openCloseModalChoose(true);
        })
    }


    render() {
        const { initialVideoRecuder } = this.props;
        const linkVideo = get(initialVideoRecuder.get('infoModule'), 'linkInitialVideo', null);
        return (
            <div style={{ verflow: 'hidden', paddingLeft: '5px', paddingRight: '5px'}}>
                <Row>
                    <ButtonsComponent showBtnGreen={true} fnButtonGreen={this._eventButtonInContent}  origin="initialVideo"/>
                    <FrameVideo linkVideo={linkVideo}
                        height={$(window).height() - HEIGTH_PANEL_BOTTOMS - 40}
                        paddingTop={HEIGTH_PANEL_BOTTOMS} />
                    <ModalChooseModule />
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoModule,
        openCloseModalChoose,
        consultAllModules
    }, dispatch);
}

function mapStateToProps({ initialVideoRecuder }) {
    return { initialVideoRecuder };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialVideo);