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
import { validateField, redirectUrl } from '../../actionsGlobal';
import $ from 'jquery';

class Foro extends Component {
    constructor(props) {
        super(props);
        this._mapItems = this._mapItems.bind(this);
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

    _mapItems(discussion, key) {
        return <ItemDiscussion
            key={key}
            idDiscussion={discussion.idDiscussion}
            title={discussion.title}
            description={discussion.description}
            nameUser={discussion.nameUser}
            createTimestamp={discussion.createTimestamp}
        />
    }

    render() {
        const { foroReducer } = this.props;
        return (
            <Row>
                <Col style={{ marginLeft: '10px', marginRight: '20px', width: '100%' }}>
                    <ButtonsComponent />
                    <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> Foro </p>
                    <Discussion />
                    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: $(window).height() - 70, marginTop: '10px', paddingRight: '10px', paddingBottom: '15px' }}>
                        {!validateField(foroReducer.get('listInfoDiscussions')) &&
                            foroReducer.get('listInfoDiscussions').map(this._mapItems)
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoDiscussions
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer, foroReducer }) {
    return { moduleContentReducer, foroReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(Foro);