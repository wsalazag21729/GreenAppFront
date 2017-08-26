import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consultInfoComments } from '../actions';
import { get, isNull, isEmpty, isEqual } from 'lodash';
import { showLoading } from '../../loading/actions';
import { MESSAGE_LOAD_DATA } from '../../../constantsGlobal';
import DateTimePickerUi from '../../../ui/dateTimePicker/dateTimePickerComponent';
import { swtShowMessage } from '../../sweetAlertMessages/actions';
import moment from 'moment';

class FilterComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: null,
            dateTime: null
        };
        this._cleanSearch = this._cleanSearch.bind(this);
        this._handleChangeKeyword = this._handleChangeKeyword.bind(this);
        this._consultInfoComments = this._consultInfoComments.bind(this);
    }

    _handleChangeKeyword(e) {
        if (e.keyCode === 13 || e.which === 13) {
            this._consultInfoComments();
        } else {
            this.setState({
                searchFilter: e.target.value
            });
        }
    }

    _consultInfoComments(clear) {
        if ((isNull(this.state.searchFilter) || isEmpty(this.state.searchFilter)) &&
            (isNull(this.state.dateTime) || isEmpty(this.state.dateTime)) && !isEqual(clear, true)) {
            const { swtShowMessage } = this.props;
            swtShowMessage("error", "Filtros incompletos", "Señor usuario, para realizar una búsqueda debe ingresar por lo menos un filtro");
        } else {
            console.log('this.state.dateTime', this.state.dateTime);
            const { foroReducer, consultInfoComments, showLoading } = this.props;
            showLoading(true, MESSAGE_LOAD_DATA);
            consultInfoComments(
                get(foroReducer.get('discussionSeleted'), 'idDiscussion', null),
                isEqual(clear, true) ? "" : this.state.searchFilter,
                isNull(this.state.dateTime) || isEmpty(this.state.dateTime) || isEqual(clear, true) ? null : moment(this.state.dateTime, 'DD/MM/YYYY').format('x')
            ).then((data) => {
                showLoading(false, "");
            });
        }
    }

    _cleanSearch() {
        this.setState({ searchFilter: "", dateTime: null });
        this._consultInfoComments(true);
    }

    render() {
        return (
            <Row style={{ marginTop: '15px', marginLeft: '0px', width: '100%' }}>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <div className="InputAddOn">
                        <input style={{ padding: '0px 11px !important' }} id="searchExpression" onKeyPress={this._handleChangeKeyword} type="text" placeholder="Búsqueda por título, nombre de usuario y descripción"
                            value={this.state.searchFilter} onChange={this._handleChangeKeyword} className="input InputAddOn-field" />
                        <button onClick={this._consultInfoComments} className="button InputAddOn-item">
                            <i className="search icon" />
                        </button>
                    </div>
                </Col>
                <Col xs={8} sm={8} md={3} lg={3}>
                    <DateTimePickerUi
                        name="dateTime"
                        onChange={val => this.setState({ dateTime: val })}
                        culture='es'
                        format={"DD/MM/YYYY"}
                        time={false}
                        placeholder="Búsqueda por fecha de creación"
                        value={this.state.dateTime}
                    />
                </Col>
                <Col xs={12} sm={12} md={1} lg={1} style={{ width: '100%' }}>
                    <button className="btn btn-primary" type="button" onClick={this._consultInfoComments} style={{ marginLeft: '10px' }}
                        title="Limpiar búsqueda">
                        Buscar
                    </button>
                </Col>
                <Col xs={12} sm={12} md={1} lg={1} style={{ width: '100%' }}>
                    <button className="btn btn-primary" type="button" onClick={this._cleanSearch}
                        title="Limpiar búsqueda">
                        <i className="erase icon"
                            style={{ color: "white", margin: '0em', fontSize: '1.2em' }}></i>
                    </button>
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoComments,
        showLoading,
        swtShowMessage
    }, dispatch);
}

function mapStateToProps({ foroReducer }) {
    return { foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterComments);