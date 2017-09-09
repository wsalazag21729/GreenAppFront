import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import FormDiscussion from './formDiscussion';
import { openCloseModal } from '../actions';

class Discussion extends Component {
    constructor(props) {
        super(props);
        this._editValueModal = this._editValueModal.bind(this);
    }

    _editValueModal(value) {
        const { openCloseModal } = this.props;
        openCloseModal(value);
    }

    render() {
        const { foroReducer } = this.props;
        return (
            <Col>
                <button className="btn btn-primary" type="button" onClick={() => this._editValueModal(true)} style={{ marginLeft: '8px' }}>
                    <span style={{ color: "#FFFFFF" }}>Crear discusión</span>
                </button>
                <Modal
                    isOpen={foroReducer.get('openModal')}
                    onRequestClose={() => this._editValueModal(false)}
                    className="modalBt4-fade modal fade contact-detail-modal in">
                    <div className="modalBt4-dialog modalBt4-lg">
                        <div className="modalBt4-content modal-content">
                            <div className="modalBt4-header modal-header">
                                <h4 className="modal-title" style={{ float: 'left', marginBottom: '0px' }} id="myModalLabel">Crear discusión</h4>
                                <button type="button" onClick={() => this._editValueModal(false)} className="close" data-dismiss="modal" role="close">
                                    <span className="modal-title" aria-hidden="true" role="close"><i className="remove icon modal-icon-close" role="close"></i></span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <FormDiscussion />
                        </div>
                    </div>
                </Modal>
            </Col>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseModal
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(Discussion);