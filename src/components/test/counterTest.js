import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Icon, Image, Statistic } from 'semantic-ui-react';
import { SIZE_MINI_STATISTIC } from './constants';

class CounterTest extends Component {
    constructor(props) {
        super(props);
        this._resetTest = this._resetTest.bind(this);
    }

    _resetTest() {
        console.log("Holaaaaaaaaaaaaaaa");
    }

    render() {
        const { testReducer } = this.props;
        return (
            <Col xs={9} md={10} lg={10}>
                <Statistic.Group size={SIZE_MINI_STATISTIC}>

                    <Statistic size={SIZE_MINI_STATISTIC} >
                        <Statistic.Value>
                            <Icon name='hand outline up' /> {testReducer.get('madePlays')}
                        </Statistic.Value>
                        <Statistic.Label style={{ backgroundColor: '#FFF' }}>Jugadas realizadas</Statistic.Label>
                    </Statistic>

                    <Statistic size={SIZE_MINI_STATISTIC} >
                        <Statistic.Value>
                            <Icon name='thumbs outline up green' /> {testReducer.get('rightPlays')}
                        </Statistic.Value>
                        <Statistic.Label style={{ backgroundColor: '#FFF' }}>Jugadas correctas</Statistic.Label>
                    </Statistic>

                    <Statistic size={SIZE_MINI_STATISTIC} >
                        <Statistic.Value>
                            <Icon name='thumbs outline down red' /> {testReducer.get('failedPlays')}
                        </Statistic.Value>
                        <Statistic.Label style={{ backgroundColor: '#FFF' }}>Jugadas fallidas</Statistic.Label>
                    </Statistic>

                </Statistic.Group>
            </Col>
        );
    }
}

function mapStateToProps({ testReducer }) {
    return { testReducer };
}

export default connect(mapStateToProps, null)(CounterTest);