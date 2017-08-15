import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirectUrl } from '../../../actionsGlobal';
import { HEIGTH_CONTROL_PANEL } from '../../../constantsGlobal';
import { get, isNull, isUndefined } from 'lodash';
import ButtonsComponent from '../../buttonsComponent/buttonsComponent';
import { consultInfoComments } from '../actions';
import ButtonAddComment from './buttonAddComment';
import ListComments from './listComments';
import moment from 'moment';
import $ from 'jquery';

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { foroReducer, consultInfoComments } = this.props;
        if (isNull(foroReducer.get('discussionSeleted')) || isUndefined(foroReducer.get('discussionSeleted'))) {
            redirectUrl("/moduleContent/content");
        } else {
            consultInfoComments(get(foroReducer.get('discussionSeleted'), 'idDiscussion', null));
        }
    }

    render() {
        const { foroReducer } = this.props;
        const jsonDiscussion = foroReducer.get('discussionSeleted');
        return (
            <div>
                <ButtonsComponent />
                <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> Foro </p>
                <Row style={{ marginLeft: '1px', paddingRight: '8px', width: '100%', overflowX: 'auto', height: $(window).height() - HEIGTH_CONTROL_PANEL }}>
                    <Col xs={4} md={3} lg={3}>
                        <span style={{ fontWeight: 'bold' }}>Nombre: </span>{jsonDiscussion.nameUser}
                    </Col>
                    <Col xs={4} md={3} lg={6}>
                        <span style={{ fontWeight: 'bold' }}>Titulo: </span>{jsonDiscussion.title}
                    </Col>
                    <Col xs={4} md={6} lg={3} style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 'bold' }}>Fecha de creación:</span>{moment(jsonDiscussion.createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}
                    </Col>
                    <Col xs={12} md={12} lg={12} style={{ marginTop: '10px' }}>
                        <div><span style={{ fontWeight: 'bold' }}>Descripción</span></div>
                        <div style={{ textAlign: 'justify' }}>{jsonDiscussion.description}</div>
                    </Col>
                    <ButtonAddComment />
                    <ListComments />
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoComments
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);