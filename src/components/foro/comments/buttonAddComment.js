import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { openCloseModalComment } from '../actions';
import FormComment from './formComment';

class ButtonAddComment extends Component {
    constructor(props) {
        super(props);
        this._editValueModalComment = this._editValueModalComment.bind(this);
    }

    _editValueModalComment(value) {
        const { openCloseModalComment } = this.props;
        openCloseModalComment(value);
    }

    render() {
        const { foroReducer } = this.props;
        return (
            <Col xs={12} md={12} lg={12} style={{marginTop: '15px', textAlign: 'right'}}>
                <button className="btn btn-primary" onClick={this._editValueModalComment}>
                    <i className="white plus icon"></i> Agregar comentario
                </button>
                <Modal
                    isOpen={foroReducer.get('openModalComment')}
                    onRequestClose={() => this._editValueModalComment(false)}
                    className="modalBt4-fade modal fade contact-detail-modal in">
                    <div className="modalBt4-dialog modalBt4-lg">
                        <div className="modalBt4-content modal-content">
                            <div className="modalBt4-header modal-header">
                                <h4 className="modal-title" style={{ float: 'left', marginBottom: '0px' }}>Crear comentario</h4>
                                <button type="button" onClick={() => this._editValueModalComment(false)} className="close" data-dismiss="modal" role="close">
                                    <span className="modal-title" aria-hidden="true" role="close"><i className="remove icon modal-icon-close" role="close"></i></span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <FormComment />
                        </div>
                    </div>
                </Modal>
            </Col>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseModalComment
    }, dispatch);
}

function mapStateToProps({ foroReducer }) {
    return { foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddComment);