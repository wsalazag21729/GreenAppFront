import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuComponent from '../menu/menu';
import { consultInfoModule } from '../initialVideo/actions';
import { consultInfoDescriptionModule } from './actions';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import { } from './actions';
import { get } from 'lodash';
import $ from 'jquery';

class ModuleContent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { consultInfoModule, consultInfoDescriptionModule } = this.props;
        consultInfoModule(MODULE_RECYCLING).then((data) => {
            const idModule = get(data.payload.data, 'idModule');
            consultInfoDescriptionModule(idModule);
        });
    }

   
    render() {
        const { moduleContentReducer } = this.props;
        return (
            <Row>
                <Col xs={3} md={3} lg={2} style={{ height: $(window).height() }}>
                    <MenuComponent />
                </Col>
                <Col xs={9} md={9} lg={10} style={{ height: $(window).height(), paddingLeft: '15px' }}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        consultInfoModule,
        consultInfoDescriptionModule
    }, dispatch);
}

function mapStateToProps({ moduleContentReducer }) {
    return { moduleContentReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContent);