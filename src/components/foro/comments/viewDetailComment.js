import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { openCloseModalViewComment } from '../actions';
import { isNull } from 'lodash';
import moment from 'moment';

class ViewDetailComment extends Component {
    constructor(props) {
        super(props);
        this._viewModalComment = this._viewModalComment.bind(this);
    }

    _viewModalComment(value) {
        const { openCloseModalViewComment } = this.props;
        openCloseModalViewComment(value);
    }

    render() {
        const { foroReducer } = this.props;
        const comment = foroReducer.get('commentSeleted');
        return (
            <Modal
                isOpen={foroReducer.get('openModalViewComment')}
                onRequestClose={() => this._viewModalComment(false)}
                className="modalBt4-fade modal fade contact-detail-modal in">
                <div className="modalBt4-dialog modalBt4-lg">
                    <div className="modalBt4-content modal-content">
                        <div className="modalBt4-header modal-header">
                            <h4 className="modal-title" style={{ float: 'left', marginBottom: '0px' }}>Visualizar comentario</h4>
                            <button type="button" onClick={() => this._viewModalComment(false)} className="close" data-dismiss="modal" role="close">
                                <span className="modal-title" aria-hidden="true" role="close"><i className="remove icon modal-icon-close" role="close"></i></span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <Row style={{margin: '10px'}}>
                            <Col xs={4} md={6} lg={5}>
                                <span style={{ fontWeight: 'bold' }}>Nombre: </span>{isNull(comment) ? "" : comment.nameUser}
                            </Col>
                            <Col xs={4} md={6} lg={5} style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: 'bold' }}>Fecha de creación:</span>{isNull(comment) ? "" : moment(comment.createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}
                            </Col>
                            <Col xs={12} md={12} lg={12} style={{ marginTop: '10px' }}>
                                <div><span style={{ fontWeight: 'bold' }}>Descripción</span></div>
                                <div style={{ textAlign: 'justify' }}>{isNull(comment) ? "" : comment.comment}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseModalViewComment
    }, dispatch);
}

function mapStateToProps({ foroReducer }) {
    return { foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailComment);