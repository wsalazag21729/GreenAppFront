import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { isNull, isUndefined } from 'lodash';
import { bindActionCreators } from 'redux';
import { shorterStringValue } from '../../../actionsGlobal';
import { openCloseModalViewComment, setCommentSeleted } from '../actions';
import ViewDetailComment from './viewDetailComment';
import moment from 'moment';

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
        return <tr key={idx}>
            <td className="collapsing">
                <i className="zoom icon" title="Ver detalle"
                    onClick={this._viewDetailsComment.bind(this, comment)}
                    style={{ cursor: "pointer" }} />
            </td>
            <td>{shorterStringValue(comment.nameUser, 50)}</td>
            <td>{moment(comment.createTimestamp, 'x').locale('es').format('DD MMM YYYY HH:mm')}</td>
            <td>{shorterStringValue(comment.comment, 180)}</td>
        </tr>
    }

    render() {
        const { foroReducer } = this.props;
        const listInfoComments = foroReducer.get('listInfoComments');
        return (
            <div style={{ width: '100%' }}>
                {!isNull(listInfoComments) && listInfoComments.length > 0 ?
                    <Row style={{ marginTop: '20px' }}>
                        <Col xs={12} md={12} lg={12}>
                            <table className="ui striped table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th style={{ width: '200px' }}>Usuario</th>
                                        <th style={{ width: '130px' }}>Fecha</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listInfoComments.map(this._mapValuesComments)}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
                                <span style={{ fontWeight: 'bold' }}>Aún no se han creado comentario</span>
                            </div>
                        </Col>
                    </Row>
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