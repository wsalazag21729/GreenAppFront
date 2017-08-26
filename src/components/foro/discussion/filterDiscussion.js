import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consultInfoDiscussions } from '../actions';
import { get, isNull, isEmpty, isEqual } from 'lodash';
import { showLoading } from '../../loading/actions';
import { MESSAGE_LOAD_DATA } from '../../../constantsGlobal';
import DateTimePickerUi from '../../../ui/dateTimePicker/dateTimePickerComponent';
import { swtShowMessage } from '../../sweetAlertMessages/actions';
import moment from 'moment';

class FilterDiscussion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFilter: null,
            dateTime: null
        };
        this._cleanSearch = this._cleanSearch.bind(this);
        this._handleChangeKeyword = this._handleChangeKeyword.bind(this);
        this._consultInfoDiscussions = this._consultInfoDiscussions.bind(this);
    }

    _handleChangeKeyword(e) {
        if (e.keyCode === 13 || e.which === 13) {
            this._consultInfoDiscussions();
        } else {
            this.setState({
                searchFilter: e.target.value
            });
        }
    }

    _consultInfoDiscussions(clear) {
        if ((isNull(this.state.searchFilter) || isEmpty(this.state.searchFilter)) &&
            (isNull(this.state.dateTime) || isEmpty(this.state.dateTime)) && !isEqual(clear, true)) {
            const { swtShowMessage } = this.props;
            swtShowMessage("error", "Filtros incompletos", "Señor usuario, para realizar una búsqueda debe ingresar por lo menos un filtro");
        } else {
            const { moduleContentReducer, consultInfoDiscussions, showLoading } = this.props;
            showLoading(true, MESSAGE_LOAD_DATA);
            consultInfoDiscussions(
                get(moduleContentReducer.get('moduleDescription'), 'idModule', null),
                isEqual(clear, true) ? "" : this.state.searchFilter,
                isNull(this.state.dateTime) || isEmpty(this.state.dateTime) || isEqual(clear, true) ? null : moment(this.state.dateTime, 'DD/MM/YYYY').format('x')
            ).then((data) => {
                showLoading(false, "");
            });
        }
    }

    _cleanSearch() {
        this.setState({ searchFilter: "", dateTime: null });
        this._consultInfoDiscussions(true);
    }

    render() {
        return (
            <Row style={{ marginTop: '15px', marginLeft: '0px' }}>
                <Col xs={12} sm={12} md={4} lg={4}>
                    <div className="InputAddOn">
                        <input style={{ padding: '0px 11px !important' }} id="searchExpression" onKeyPress={this._handleChangeKeyword} type="text" placeholder="Búsqueda por título, nombre de usuario y descripción"
                            value={this.state.searchFilter} onChange={this._handleChangeKeyword} className="input InputAddOn-field" />
                        <button onClick={this._consultInfoDiscussions} className="button InputAddOn-item">
                            <i className="search icon" />
                        </button>
                    </div>
                </Col>
                <Col xs={5} sm={5} md={3} lg={3}>
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
                <Col xs={2} sm={2} md={1} lg={1} style={{ width: '100%' }}>
                    <button className="btn btn-primary" type="button" onClick={this._consultInfoDiscussions} style={{ marginLeft: '10px' }}
                        title="Limpiar búsqueda">
                        Buscar
                    </button>
                </Col>
                <Col xs={32} sm={2} md={1} lg={1} style={{ width: '100%' }}>
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
        consultInfoDiscussions,
        showLoading,
        swtShowMessage
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterDiscussion);