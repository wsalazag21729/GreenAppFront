import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import Input from '../../../ui/input/inputComponent';
import TextArea from '../../../ui/textarea/textareaComponent';
import { VALUE_REQUIERED, SUCCESS, STATUS_SUCCESS } from '../../../constantsGlobal';
import { validateField } from '../../../actionsGlobal';
import { saveDiscussion, consultInfoDiscussions, openCloseModal } from '../actions';
import SweetAlert from 'sweetalert-react';
import { get, isEqual } from 'lodash';

const fields = ["nameUser", 'title', 'description'];

const validate = (values) => {
    const errors = {};
    if (validateField(values.nameUser)) {
        errors.nameUser = VALUE_REQUIERED;
    } else {
        errors.nameUser = null;
    }
    if (validateField(values.title)) {
        errors.title = VALUE_REQUIERED;
    } else {
        errors.title = null;
    }
    if (validateField(values.description)) {
        errors.description = VALUE_REQUIERED;
    } else {
        errors.description = null;
    }
    return errors;
};

class FormDiscussion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        };
        this._closeCreate = this._closeCreate.bind(this);
        this._createDiscussion = this._createDiscussion.bind(this);
    }

    _createDiscussion() {
        const { fields: { nameUser, title, description }, moduleContentReducer, saveDiscussion, consultInfoDiscussions } = this.props;
        const jsonDiscussion = {
            "title": title.value,
            "description": description.value,
            "idModule": get(moduleContentReducer.get('moduleDescription'), 'idModule', null),
            "nameUser": nameUser.value,
        };
        saveDiscussion(jsonDiscussion).then((data) => {
            if (isEqual(get(data, 'payload.status'), STATUS_SUCCESS) && isEqual(get(data, 'payload.data'), SUCCESS)) {
                this.setState({ showMessage: true });
                consultInfoDiscussions(get(moduleContentReducer.get('moduleDescription'), 'idModule', null)).then((data) => {
                });
            }
        });
    }

    _closeCreate() {
        const { openCloseModal } = this.props;
        this.setState({
            showMessage: false
        });
        openCloseModal(false);
    }

    render() {
        const { fields: { nameUser, title, description }, foroReducer, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this._createDiscussion)}>
                <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '30px' }}>
                    <p style={{ paddingTop: "10px", marginBottom: "0px" }}>
                        Los campos marcados con asterisco (<span style={{ color: "red" }}>*</span>) son obligatorios.
                    </p>
                    <Row style={{ marginTop: '15px' }}>
                        <Col xs={12} md={6} lg={6}>
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
                        <Col xs={12} md={6} lg={6}>
                            <dt><span>Título (<span style={{ color: "red" }}>*</span>)</span></dt>
                            <dt style={{ paddingTop: "0px" }}>
                                <Input
                                    name="title"
                                    type="text"
                                    max="100"
                                    {...title}
                                />
                            </dt>
                        </Col>
                        <Col xs={12} md={12} lg={12} style={{ marginTop: '10px' }}>
                            <dt><span>Descripción (<span style={{ color: "red" }}>*</span>)</span></dt>
                            <dt style={{ paddingTop: "0px" }}>
                                <TextArea
                                    name="description"
                                    type="text"
                                    max="6000"
                                    style={{ width: '100%', height: '100%' }}
                                    rows={6}
                                    {...description}
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
                    title="Creación de discusión"
                    text="Señor usuario, la discusión fue creada con exito."
                    onConfirm={() => this._closeCreate()}
                />
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveDiscussion,
        openCloseModal,
        consultInfoDiscussions
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }, { ownerProps }) {
    return { moduleContentReducer, foroReducer };
}


export default reduxForm({
    form: 'submitCreateDiscussion',
    fields,
    destroyOnUnmount: true,
    validate
}, mapStateToProps, mapDispatchToProps)(FormDiscussion);