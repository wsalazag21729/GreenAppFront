import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { isNull, isUndefined } from 'lodash';
import { bindActionCreators } from 'redux';
import { shorterStringValue } from '../../../actionsGlobal';
import { openCloseModalViewComment, setCommentSeleted } from '../actions';
import ViewDetailComment from './viewDetailComment';
import moment from 'moment';
import { Table } from 'semantic-ui-react'

class ListComments extends Component {
    constructor(props) {
        super(props);
        this._mapValuesComments = this._mapValuesComments.bind(this);
    }

    componentWillMount() {
        const { foroReducer } = this.props;
        if (isNull(foroReducer.get('discussionSeleted')) || isUndefined(foroReducer.get('discussionSeleted'))) {
            redirectUrl("/moduleContent/content");
        }
    }

    _viewDetailsComment(comment) {
        const { setCommentSeleted, openCloseModalViewComment } = this.props;
        setCommentSeleted(comment);
        openCloseModalViewComment(true);
    }

    _mapValuesComments(comment, idx) {
        return <Table.Row key={idx}>
            <Table.Cell>
                <i className="zoom icon" title="Ver detalle"
                    onClick={this._viewDetailsComment.bind(this, comment)}
                    style={{ cursor: "pointer" }} />
            </Table.Cell>
            <Table.Cell>{shorterStringValue(comment.nameUser, 50)}</Table.Cell>
            <Table.Cell>{moment(comment.createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}</Table.Cell>
            <Table.Cell>{shorterStringValue(comment.nameUser, 50)}</Table.Cell>
        </Table.Row>
    }

    render() {
        const { foroReducer } = this.props;
        const listInfoComments = foroReducer.get('listInfoComments');
        return (
            <div style={{ width: '100%', marginLeft: '10px', paddingRight: '8px', marginTop: '5px' }}>
                {!isNull(listInfoComments) && listInfoComments.length > 0 ?
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell style={{width: '30px'}}></Table.HeaderCell>
                                        <Table.HeaderCell>Usuario</Table.HeaderCell>
                                        <Table.HeaderCell>Fecha</Table.HeaderCell>
                                        <Table.HeaderCell>Comentario</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {listInfoComments.map(this._mapValuesComments)}
                                </Table.Body>
                            </Table>
                        </Col>
                    </Row>
                    :
                    <Col xs={12} md={12} lg={12} style={{ height: '25px' }}>
                        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
                            <span style={{ fontWeight: 'bold' }}>Aún no se han creado comentarios</span>
                        </div>
                    </Col>
                }
                <ViewDetailComment />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openCloseModalViewComment,
        setCommentSeleted
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(ListComments);