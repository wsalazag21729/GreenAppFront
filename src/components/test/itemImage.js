import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SIZE_MINI_STATISTIC } from './constants';
import { Image, Reveal } from 'semantic-ui-react';
import { get, indexOf, isEqual, isNull, size } from 'lodash';
import {
    setCount, setIdImageEvaluated, discoverImage, alterPlaysTest,
    setIdxItemSeleted, setIdxItemSeletedTemporary
} from './actions';
import { swtShowMessage } from '../sweetAlertMessages/actions';

class ItemImage extends Component {
    constructor(props) {
        super(props);
        this.onClickImage = this.onClickImage.bind(this);
        this._clearOnePlayTest = this._clearOnePlayTest.bind(this);
    }

    onClickImage(id, idx) {
        const { testReducer, setIdImageEvaluated, setCount, discoverImage, alterPlaysTest,
            setIdxItemSeleted, setIdxItemSeletedTemporary, swtShowMessage } = this.props;
        console.log('1');
        //Solo valido si doy click en una imagen que ya se emparejado o si doy click en la misma imagen
        if (indexOf(testReducer.get('listIdsImagesMounted'), id) < 0 &&
            (isNull(testReducer.get('idxItemSeleted')) || !isEqual(testReducer.get('idxItemSeleted'), idx))) {
            if (isEqual(testReducer.get('count'), 1)) { //Si es igual a 1 es por que es la segunda selección
                alterPlaysTest('madePlays', testReducer.get('madePlays') + 1);
                setCount(0);
                if (isEqual(testReducer.get('idImageEvaluated'), id)) { //Si empareje imagen
                    alterPlaysTest('rightPlays', testReducer.get('rightPlays') + 1);
                    discoverImage(id);
                    this._clearOnePlayTest();
                    const sizeFirstList = size(testReducer.get('listImages'));
                    const sizeSecondList = size(testReducer.get('listIdsImagesMounted')) * 2;
                    if (isEqual(sizeFirstList, sizeSecondList)) {
                        swtShowMessage('success', '¡Felicitaciones!', 'Juego terminado');
                    }
                } else {
                    alterPlaysTest('failedPlays', testReducer.get('failedPlays') + 1);
                    setIdxItemSeletedTemporary(idx);
                    setTimeout(() => {
                        this._clearOnePlayTest();
                    }, 400)
                }
            } else {
                setCount(1);
                setIdImageEvaluated(id);
                setIdxItemSeleted(idx);
            }
        }
    }

    _clearOnePlayTest() {
        const { setIdImageEvaluated, setIdxItemSeleted, setIdxItemSeletedTemporary } = this.props;
        setIdImageEvaluated(null);
        setIdxItemSeleted(null);
        setIdxItemSeletedTemporary(null);
    }

    render() {
        const { id, idx, message, urlImage, testReducer, urlUnmontedImage } = this.props;
        let url;
        let itemResolve = false;
        if (indexOf(testReducer.get('listIdsImagesMounted'), id) >= 0 || isEqual(testReducer.get('idxItemSeleted'), idx)
            || isEqual(testReducer.get('idxItemSeletedTemporary'), idx)) {
            url = urlImage;
            itemResolve = true;
        } else {
            url = urlUnmontedImage;
        }

        return (
            <Col xs={3} md={2} lg={2} style={{ marginTop: '10px' }}>
                <Image size='medium' style={itemResolve ? { cursor: 'no-drop' } : { cursor: 'pointer', border: '1px solid #ECECEC' }} 
                    src={"/img/" + url} onClick={() => this.onClickImage(id, idx)} />
            </Col>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setIdxItemSeletedTemporary,
        setIdImageEvaluated,
        setIdxItemSeleted,
        alterPlaysTest,
        swtShowMessage,
        discoverImage,
        setCount
    }, dispatch);
}

function mapStateToProps({ testReducer }) {
    return { testReducer };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemImage);