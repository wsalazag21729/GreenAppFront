import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { openCloseModalChoose } from '../actions';
import { LABEL_INFO_MODULE } from '../constants';
import { isUndefined, size } from 'lodash';
import { Menu } from "semantic-ui-react";
import MenuItem from "./menuItem";
import { redirectUrl } from '../../../actionsGlobal';

class ModalChooseModule extends Component {
    constructor(props) {
        super(props);
        this._onClickModule = this._onClickModule.bind(this);
        this._editValueModal = this._editValueModal.bind(this);
        this._mapValuesModules = this._mapValuesModules.bind(this);
    }

    _editValueModal(value) {
        const { openCloseModalChoose } = this.props;
        openCloseModalChoose(value);
    }

    _onClickModule(idModule, nameModule) {
        window.localStorage.setItem('idModule', idModule)
        window.localStorage.setItem('nameModule', nameModule)
        redirectUrl("/moduleContent/content");
        this._editValueModal(false);
    }

    _mapValuesModules(item, idx) {
        return <MenuItem
            labelText={item.nameModule}
            fnClick={() => this._onClickModule(item.idModule, item.nameModule)}
            iconClassName="tasks"
        />
    }

    render() {
        const { initialVideoRecuder } = this.props;
        return (
            <Col>
                <Modal
                    isOpen={initialVideoRecuder.get('openModalChoose')}
                    onRequestClose={() => this._editValueModal(false)}
                    className="modalBt4-fade modal fade contact-detail-modal in">
                    <div className="modalBt4-dialog">
                        <div className="modalBt4-content modal-content">
                            <div className="modalBt4-header modal-header">
                                <h4 className="modal-title" style={{ float: 'left', marginBottom: '0px' }} id="myModalLabel">Elegir módulo</h4>
                                <button type="button" onClick={() => this._editValueModal(false)} className="close" data-dismiss="modal" role="close">
                                    <span className="modal-title" aria-hidden="true" role="close"><i className="remove icon modal-icon-close" role="close"></i></span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div style={{ margin: '10px' }}>
                                <span style={{ fontWeight: 'normal', color: '#4C5360', textAlign: 'justify' }}>
                                    {LABEL_INFO_MODULE}
                                </span>
                                {!isUndefined(initialVideoRecuder.get('modules')) && size(initialVideoRecuder.get('modules')) > 0 ?
                                    <Menu vertical fluid attached="top">
                                        {initialVideoRecuder.get('modules').map(this._mapValuesModules)}
                                    </Menu>
                                    :
                                    <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
                                        <span style={{ fontWeight: 'bold' }}>Aún no se han configurado módules</span>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </Modal>
            </Col >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseModalChoose
    }, dispatch);
}

function mapStateToProps({ initialVideoRecuder }) {
    return { initialVideoRecuder };
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalChooseModule);