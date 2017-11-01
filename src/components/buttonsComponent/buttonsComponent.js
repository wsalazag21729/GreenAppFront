import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import { redirectUrl, _clickBack, _clickEnter, _clickForo, _clickTest } from '../../actionsGlobal';
import { get, isUndefined, isEqual } from 'lodash';
import $ from 'jquery';

const HEIGTH_PANEL_BOTTOMS = 40;

class ButtonsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { fnButtonRed, fnButtonGreen, fnButtonYellow, fnButtonBlue, origin } = this.props;
        const { showBtnRed, showBtnGreen, showBtnYellow, showBtnBlue, nameButtonYellow, nameButtonBlue, nameButtonGreen } = this.props;
        if (showBtnRed && isUndefined(fnButtonRed)) {
            fnButtonRed = _clickBack;
        }
        if (showBtnGreen && isUndefined(fnButtonGreen)) {
            fnButtonGreen = _clickEnter;
        }
        if (showBtnYellow && isUndefined(fnButtonYellow)) {
            fnButtonYellow = _clickForo;
        }
        if (showBtnBlue && isUndefined(fnButtonBlue)) {
            fnButtonBlue = _clickTest;
        }
        return (
            <Col xs={isEqual(origin, 'initialVideo') ? 12 : 9} md={isEqual(origin, 'initialVideo') ? 12 : 8} lg={isEqual(origin, 'initialVideo') ? 12 : 7} style={{ paddingTop: '5px', textAlign: 'right' }}>
                {showBtnRed &&
                    <button className="btn btn-sm btn-danger" type="button" onClick={fnButtonRed} style={{ marginLeft: '8px' }}>
                        <span style={{ color: "#FFFFFF" }}>Inicio</span>
                    </button>
                }
                {showBtnGreen &&
                    <button className="btn btn-sm btn-success" type="button" onClick={fnButtonGreen} style={{ marginLeft: '8px' }}>
                        <span style={{ color: "#FFFFFF" }}>{isUndefined(nameButtonGreen) ? "Ingresar" : nameButtonGreen}</span>
                    </button>
                }
                {showBtnYellow &&
                    <button className="btn btn-sm btn-warning" type="button" onClick={fnButtonYellow} style={{ marginLeft: '8px' }}>
                        <span style={{ color: "#FFFFFF" }}>{isUndefined(nameButtonYellow) ? "Foro" : nameButtonYellow}</span>
                    </button>
                }
                {showBtnBlue &&
                    <button className="btn btn-sm btn-primary" type="button" onClick={fnButtonBlue} style={{ marginLeft: '8px', marginRight: '10px' }}>
                        <span style={{ color: "#FFFFFF" }}>{isUndefined(nameButtonBlue) ? "¡Evalúate!" : nameButtonBlue}</span>
                    </button>
                }
            </Col>
        );
    }
}

export default ButtonsComponent;