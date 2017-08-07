import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col>
                    <ButtonsComponent />
                </Col>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ initialVideoRecuder }) {
    return { initialVideoRecuder };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);