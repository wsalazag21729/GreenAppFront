import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { consultInfoDiscussions } from './actions';
import { get, isNull } from 'lodash';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';
import Discussion from './discussion/discussion';
import ItemDiscussion from './itemDiscussion/itemDiscussion';
import FilterDiscussion from './discussion/filterDiscussion';
import { validateField, redirectUrl } from '../../actionsGlobal';
import { HEIGTH_CONTROL_PANEL } from '../../constantsGlobal';
import { Divider } from 'semantic-ui-react';
import { openCloseModal } from './actions';
import $ from 'jquery';

class Foro extends Component {
    constructor(props) {
        super(props);
        this._mapItems = this._mapItems.bind(this);
        this.openModalDiscussion = this.openModalDiscussion.bind(this);
    }

    componentWillMount() {
        const { moduleContentReducer, consultInfoDiscussions } = this.props;
        const idModule = get(moduleContentReducer.get('moduleDescription'), 'idModule', null);
        if (isNull(idModule)) {
            redirectUrl("/moduleContent/content");
        } else {
            consultInfoDiscussions(get(moduleContentReducer.get('moduleDescription'), 'idModule', null));
        }
    }

    _mapItems(discussion, idx) {
        return <ItemDiscussion
            key={idx}
            idDiscussion={discussion.idDiscussion}
            title={discussion.title}
            description={discussion.description}
            nameUser={discussion.nameUser}
            createTimestamp={discussion.createTimestamp}
        />
    }

    openModalDiscussion() {
        const { openCloseModal } = this.props;
        openCloseModal(true);
    }

    render() {
        const { foroReducer } = this.props;
        return (
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '15px', width: '100%' }}>
                <Row style={{ marginRight: '5px' }}>
                    <Col xs={3} md= {5} lg={5} style={{ width: '100%' }}>
                        <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> Foro </p>
                    </Col>
                    <ButtonsComponent showBtnRed={true} showBtnGreen={true} nameButtonGreen={window.localStorage.getItem('nameModule')} showBtnYellow={true}
                            nameButtonYellow="Crear discusión" fnButtonYellow={this.openModalDiscussion} showBtnBlue={true} />
                    <Col xs={12} md={12} lg={12}>
                        <Divider clearing />
                    </Col>
                    <Col xs style={{ width: '100%' }}>
                        <Discussion />
                        <FilterDiscussion />
                        <div style={{ overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px', paddingBottom: '15px' }}>
                            {!validateField(foroReducer.get('listInfoDiscussions')) &&
                                foroReducer.get('listInfoDiscussions').map(this._mapItems)
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoDiscussions,
        openCloseModal
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foro);