import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuComponent from '../menu/menu';
import { consultInfoModule } from '../initialVideo/actions';
import { consultInfoDescriptionModule } from './actions';
import { MODULE_RECYCLING } from '../../constantsGlobal';
import Loading from '../loading/loadingComponent';
import { } from './actions';
import { get } from 'lodash';
import $ from 'jquery';
import SwtAlertMessage from '../sweetAlertMessages/swtMessageComponent';

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
        const { loading, moduleContentReducer } = this.props;
        return (
            <Row>
                <Col xs={3} md={3} lg={2} style={{ height: $(window).height() }} style={{ background: '#F1F1F1' }}>
                    <MenuComponent />
                </Col>
                <Col xs={9} md={9} lg={10} style={{ height: $(window).height(), paddingLeft: '15px' }}>
                    {this.props.children}
                    {loading.get('showLoading') &&
                        <Loading />
                    }
                </Col>
                <SwtAlertMessage />
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

function mapStateToProps({ moduleContentReducer, loading }) {
    return { moduleContentReducer, loading };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContent);