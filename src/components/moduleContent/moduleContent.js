import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuComponent from '../menu/menu';
import { consultInfoModule } from '../initialVideo/actions';
import { consultInfoDescriptionModule } from './actions';
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
        consultInfoDescriptionModule(window.localStorage.getItem('idModule'));
    }


    render() {
        const { loading, moduleContentReducer } = this.props;
        return (
            <div>
                <Row>
                    <MenuComponent />
                </Row>
                <Row style={{ height: $(window).height() - 40, paddingLeft: '15px' }}>
                    {this.props.children}
                    {loading.get('showLoading') &&
                        <Loading />
                    }
                </Row>
                <SwtAlertMessage />
            </div>
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