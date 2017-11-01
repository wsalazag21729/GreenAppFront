import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirectUrl } from '../../../actionsGlobal';
import { get, isNull, isUndefined, isNil } from 'lodash';
import { Divider } from 'semantic-ui-react';
import ButtonsComponent from '../../buttonsComponent/buttonsComponent';
import { consultInfoComments, openCloseModalComment, setDiscussionSeleted } from '../actions';
import ButtonAddComment from './buttonAddComment';
import ListComments from './listComments';
import FilterComments from './filterComments';
import moment from 'moment';
import $ from 'jquery';

class Comments extends Component {
    constructor(props) {
        super(props);
        this._openModalComment = this._openModalComment.bind(this);
    }

    componentWillMount() {
        const { foroReducer, consultInfoComments, setDiscussionSeleted } = this.props;
        let idDiscussion = get(foroReducer.get('discussionSeleted'), 'idDiscussion', null);
        console.log("1", idDiscussion);
        console.log('idDiscussion', idDiscussion);
        if (_.isNull(idDiscussion)) {
            console.log('idDiscussion', idDiscussion);
            const jsonDiscussion = {
                "idDiscussion": window.localStorage.getItem('idDiscussion'),
                "title": window.localStorage.getItem('titleDiscussion'),
                "nameUser": window.localStorage.getItem('nameUserDiscussion'),
                "description": window.localStorage.getItem('descriptionDiscussion'),
                "createTimestamp": window.localStorage.getItem('createTimestampDiscussion')
            };
            console.log(jsonDiscussion);
            idDiscussion = jsonDiscussion.idDiscussion;
            setDiscussionSeleted(jsonDiscussion);
        }
        console.log(idDiscussion);
        consultInfoComments(idDiscussion);
    }

    _openModalComment() {
        const { openCloseModalComment } = this.props;
        openCloseModalComment(true);
    }

    render() {
        const { foroReducer } = this.props;
        const jsonDiscussion = foroReducer.get('discussionSeleted');
        return (
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '15px' }}>
                <Row style={{ marginRight: '5px' }}>
                    <Col xs={3} md={6} lg={5} style={{ width: '100%' }}>
                        <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> Foro </p>
                    </Col>
                    <ButtonsComponent showBtnRed={true} showBtnGreen={true} nameButtonGreen={window.localStorage.getItem('nameModule')} showBtnYellow={true}
                        nameButtonYellow="Crear comentario" fnButtonYellow={this._openModalComment} showBtnBlue={true} />
                    <Col xs={12} md={12} lg={12}>
                        <Divider clearing />
                    </Col>
                    <Col xs={4} md={3} lg={3} style={{ height: '25px' }}>
                        <span style={{ fontWeight: 'bold' }}>Nombre: </span>{isNil(jsonDiscussion) ? "" : jsonDiscussion.nameUser}
                    </Col>
                    <Col xs={4} md={3} lg={6} style={{ height: '25px' }}>
                        <span style={{ fontWeight: 'bold' }}>Titulo: </span>{isNil(jsonDiscussion) ? "" : jsonDiscussion.title}
                    </Col>
                    <Col xs={4} md={6} lg={3} style={{ textAlign: 'right', height: '25px' }}>
                        <span style={{ fontWeight: 'bold' }}>Fecha de creación:</span>{isNil(jsonDiscussion) ? "" : moment(jsonDiscussion.createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}
                    </Col>
                    <Col xs={12} md={12} lg={12} style={{ marginTop: '10px' }}>
                        <div><span style={{ fontWeight: 'bold' }}>Descripción</span></div>
                        <div style={{ textAlign: 'justify' }}>{isNil(jsonDiscussion) ? "" : jsonDiscussion.description}</div>
                    </Col>
                    <ButtonAddComment />
                    <FilterComments />
                    <ListComments />
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoComments,
        openCloseModalComment,
        setDiscussionSeleted
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);