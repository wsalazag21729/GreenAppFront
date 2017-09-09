import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonsComponent from '../buttonsComponent/buttonsComponent';
import { Divider } from 'semantic-ui-react';
import { alterPlaysTest, clearCounters, consultImagesModule } from './actions';
import CounterTest from './counterTest';
import ItemImage from './ItemImage';
import { size, isEqual } from 'lodash';
import { sample } from 'lodash';

const arrayUnmontedImage = [
    'noSeletedImage.png',
    'noSeletedImage2.png',
    'noSeletedImage3.png',
    'noSeletedImage4.png'
];

let urlImageNoSeleted = null;

class Test extends Component {
    constructor(props) {
        super(props);
        this._resetTest = this._resetTest.bind(this);
        this._eventAddPlay = this._eventAddPlay.bind(this);
        this._mapImagesModule = this._mapImagesModule.bind(this);
    }

    _resetTest() {
        const { clearCounters } = this.props;
        clearCounters();
    }

    componentWillMount() {
        urlImageNoSeleted = sample(arrayUnmontedImage);
        const { consultImagesModule } = this.props;
        consultImagesModule(window.localStorage.getItem('idModule'));
        this._resetTest();
    }

    _eventAddPlay(nameTypePlay) {
        const { testReducer, alterPlaysTest } = this.props;
        let plays = testReducer.get(nameTypePlay);
        alterPlaysTest(nameTypePlay, plays++);
    }

    _mapImagesModule(item, idx) {
        return <ItemImage key={idx} idx={idx} id={item.idImagesModule} message={item.message}
            urlImage={item.name} urlUnmontedImage={urlImageNoSeleted} />
    }

    render() {
        const { testReducer } = this.props;
        return (
            <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '15px' }}>
                <Row style={{ marginRight: '5px' }}>
                    <Col xs={4} md={6} lg={5} style={{ width: '100%' }}>
                        <p style={{ fontSize: '15pt', fontWeight: 'bold', margin: '5px 0 10px 6px' }}> ¡Evalúate! </p>
                    </Col>
                    <ButtonsComponent showBtnRed={true} showBtnGreen={true} showBtnYellow={true}
                        showBtnBlue={true} nameButtonBlue="Reiniciar juego" fnButtonBlue={this._resetTest} />
                    <Col xs={12} md={12} lg={12}>
                        <Divider clearing />
                    </Col>
                    <CounterTest />
                    <Col xs={3} md={2} lg={2} style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" type="button" onClick={() => this._resetTest(true)}>
                            <span style={{ color: "#FFFFFF" }}>Reiniciar juego</span>
                        </button>
                    </Col>
                    {size(testReducer.get('listImages')) > 0 &&
                        testReducer.get('listImages').map(this._mapImagesModule)
                    }
                </Row>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        alterPlaysTest,
        clearCounters,
        consultImagesModule
    }, dispatch);
}

function mapStateToProps({ testReducer }) {
    return { testReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);