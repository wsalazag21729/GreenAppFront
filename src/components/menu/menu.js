import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Menu } from 'semantic-ui-react'
import {redirectUrl} from '../../actionsGlobal';
import { get } from 'lodash';
import $ from 'jquery';

class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this._cickEnterToContent = this._cickEnterToContent.bind(this);
        this._cickEnterToForo = this._cickEnterToForo.bind(this);
        this._cickEnterToTest = this._cickEnterToTest.bind(this);
    }

    _cickEnterToContent() {
        redirectUrl("/moduleContent/content");
    }

    _cickEnterToForo() {
        redirectUrl("/moduleContent/foro");
    }

    _cickEnterToTest() {
        redirectUrl("/moduleContent/test");
    }

    render() {
        const { moduleContentReducer } = this.props;
        return (
            <div style={{ marginLeft: '5px', marginTop: '12px' }}>
                <span style={{ fontSize: '15pt', fontWeight: 'bold', marginLeft: '3px' }}> Menú </span>
                <Menu vertical>
                    <Menu.Item as='a' onClick={this._cickEnterToContent}>{window.localStorage.getItem('nameModule')}</Menu.Item>
                    <Menu.Item as='a' onClick={this._cickEnterToForo}>Foro</Menu.Item>
                    <Menu.Item as='a' onClick={this._cickEnterToTest}>¡Evalúate!</Menu.Item>
                </Menu>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer }) {
    return { moduleContentReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);