import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import { redirectUrl, _clickBack, _clickEnter, _clickForo, _clickMenu } from '../../actionsGlobal';
import { get, isUndefined } from 'lodash';
import $ from 'jquery';

const HEIGTH_PANEL_BOTTOMS = 40;

class ButtonsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { fnButtonRed, fnButtonGreen, fnButtonWaning, fnButtonInfo } = this.props;
        if( isUndefined(fnButtonRed) ){
            fnButtonRed = _clickBack;
        }
        if( isUndefined(fnButtonGreen) ){
            fnButtonGreen = _clickEnter;
        }
        if( isUndefined(fnButtonWaning) ){
            fnButtonWaning = _clickForo;
        }
        if( isUndefined(fnButtonInfo) ){
            fnButtonInfo = _clickMenu;
        }
        return (
            <Col xs={12} md={12} lg={12} style={{ paddingTop: '5px', right: "0px", position: 'fixed' }}>
                <button className="btn btn-sm btn-danger" type="button" onClick={fnButtonRed} style={{ marginLeft: '8px' }}>
                    <span style={{ color: "#FFFFFF" }}>Atras</span>
                </button>
                <button className="btn btn-sm btn-success" type="button" onClick={fnButtonGreen} style={{ marginLeft: '8px' }}>
                    <span style={{ color: "#FFFFFF" }}>Ingresar</span>
                </button>
                <button className="btn btn-sm btn-warning" type="button" onClick={fnButtonWaning} style={{ marginLeft: '8px' }}>
                    <span style={{ color: "#FFFFFF" }}>Foro</span>
                </button>
                <button className="btn btn-sm btn-info" type="button" onClick={fnButtonInfo} style={{ marginLeft: '8px' }}>
                    <span style={{ color: "#FFFFFF" }}>Menú</span>
                </button>
            </Col>
        );
    }
}

export default ButtonsComponent;