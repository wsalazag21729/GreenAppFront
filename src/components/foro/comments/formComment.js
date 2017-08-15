import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import Input from '../../../ui/input/inputComponent';
import TextArea from '../../../ui/textarea/textareaComponent';
import { VALUE_REQUIERED, SUCCESS, STATUS_SUCCESS } from '../../../constantsGlobal';
import { validateField } from '../../../actionsGlobal';
import { saveComment, consultInfoComments, openCloseModalComment } from '../actions';
import SweetAlert from 'sweetalert-react';
import { get, isEqual } from 'lodash';

const fields = ["nameUser", 'comment'];

const validate = (values) => {
    const errors = {};
    if (validateField(values.nameUser)) {
        errors.nameUser = VALUE_REQUIERED;
    } else {
        errors.nameUser = null;
    }
    if (validateField(values.comment)) {
        errors.comment = VALUE_REQUIERED;
    } else {
        errors.comment = null;
    }
    return errors;
};

class FormComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        };
        this._closeCreate = this._closeCreate.bind(this);
        this._createComment = this._createComment.bind(this);
    }

    _createComment() {
        const { fields: { nameUser, comment }, foroReducer, saveComment, consultInfoComments } = this.props;
        const jsonComment = {
            "comment": comment.value,
            "idDiscussion": get(foroReducer.get('discussionSeleted'), 'idDiscussion', null),
            "nameUser": nameUser.value,
        };
        saveComment(jsonComment).then((data) => {
            if (isEqual(get(data, 'payload.status'), STATUS_SUCCESS) && isEqual(get(data, 'payload.data'), SUCCESS)) {
                this.setState({ showMessage: true });
                consultInfoComments(get(foroReducer.get('discussionSeleted'), 'idDiscussion', null));
            }
        });
    }

    _closeCreate() {
        const { openCloseModalComment } = this.props;
        this.setState({
            showMessage: false
        });
        openCloseModalComment(false);
    }

    render() {
        const { fields: { nameUser, comment }, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this._createComment)}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '30px' }}>
                    <p style={{ paddingTop: "10px", marginBottom: "0px" }}>
                        Los campos marcados con asterisco (<span style={{ color: "red" }}>*</span>) son obligatorios.
                    </p>
                    <Row style={{ marginTop: '15px' }}>
                        <Col xs={12} md={12} lg={12}>
                            <dt><span>Nombre (<span style={{ color: "red" }}>*</span>)</span></dt>
                            <dt style={{ paddingTop: "0px" }}>
                                <Input
                                    name="nameUser"
                                    type="text"
                                    max="100"
                                    {...nameUser}
                                />
                            </dt>
                        </Col>
                        <Col xs={12} md={12} lg={12} style={{ marginTop: '10px' }}>
                            <dt><span>Comentario (<span style={{ color: "red" }}>*</span>)</span></dt>
                            <dt style={{ paddingTop: "0px" }}>
                                <TextArea
                                    name="comment"
                                    type="text"
                                    max="6000"
                                    style={{ width: '100%', height: '100%' }}
                                    rows={6}
                                    {...comment}
                                />
                            </dt>
                        </Col>
                    </Row>
                </div>
                <div className="modalBt4-footer modal-footer">
                    <button type="submit" className="btn btn-primary modal-button-edit">
                        Guardar
                    </button>
                </div>
                <SweetAlert
                    type="success"
                    show={this.state.showMessage}
                    title="Creación de comentario"
                    text="Señor usuario, el comentario fue creado con exito."
                    onConfirm={() => this._closeCreate()}
                />
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveComment,
        openCloseModalComment,
        consultInfoComments
    }, dispatch);
}

function mapStateToProps({ foroReducer }, { ownerProps }) {
    return { foroReducer };
}


export default reduxForm({
    form: 'submitCreateComment',
    fields,
    destroyOnUnmount: true,
    validate
}, mapStateToProps, mapDispatchToProps)(FormComment);