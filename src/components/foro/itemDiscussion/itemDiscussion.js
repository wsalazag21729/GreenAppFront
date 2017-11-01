import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shorterStringValue, redirectUrl } from '../../../actionsGlobal';
import { setDiscussionSeleted } from '../actions';
import moment from 'moment';

class ItemDiscussion extends Component {
    constructor(props) {
        super(props);
        this._viewDetailDiscussion = this._viewDetailDiscussion.bind(this);
    }

    _viewDetailDiscussion() {
        const { setDiscussionSeleted, idDiscussion, title, description, nameUser, createTimestamp  } = this.props;
        const jsonDiscussion = {
            idDiscussion,
            title,
            nameUser,
            description,
            createTimestamp
        };
        window.localStorage.setItem('idDiscussion', idDiscussion);
        window.localStorage.setItem('titleDiscussion', idDiscussion);
        window.localStorage.setItem('nameUserDiscussion', idDiscussion);
        window.localStorage.setItem('descriptionDiscussion', idDiscussion);
        window.localStorage.setItem('createTimestampDiscussion', idDiscussion);
        setDiscussionSeleted(jsonDiscussion);
        redirectUrl("/moduleContent/comments");
    }

    render() {
        const { title, description, nameUser, createTimestamp } = this.props;
        return (
            <Row style={{
                marginLeft: '8px', marginRight: '15px', width: '100%', marginTop: '10px',
                overflow: 'hidden', border: '1px solid #DCDCDC', padding: '5px', boxShadow: '0px 1px 2px 0 rgba(34, 36, 38, 0.15)'
            }}>
                <Col xs={12} md={3} lg={3} style={{ height: '25px' }}>
                    <span style={{ fontWeight: 'bold' }}>Nombre: </span>{shorterStringValue(nameUser, 20)}
                </Col>
                <Col xs={12} md={3} lg={6} style={{ height: '25px' }}>
                    <span style={{ fontWeight: 'bold' }}>Titulo: </span>{shorterStringValue(title, 50)}
                </Col>
                <Col xs={12} md={6} lg={3} style={{ height: '25px', textAlign: 'right' }}>
                    <span style={{ fontWeight: 'bold' }}>Fecha de creación:</span>{moment(createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}
                </Col>
                <Col xs={12} md={12} lg={12}>
                    <div><span style={{ fontWeight: 'bold' }}>Descripción</span></div>
                    <div>{shorterStringValue(description, 330)}</div>
                </Col>
                <Col xs={12} md={6} lg={3} style={{ textAlign: 'left', marginTop: '10px' }}>
                    <i className="unhide icon blue view-detail-discussion" role="close" onClick={this._viewDetailDiscussion}
                        style={{ cursor: 'pointer', width: '1100px', display: 'flex' }}> Ver detalle
                    </i>
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setDiscussionSeleted
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemDiscussion);