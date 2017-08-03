import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import ComboBox from '../../ui/comboBox/comboBoxComponent';
import {reduxForm} from 'redux-form';



const propsComboBox = {
    nameInput: 'Pagina',
    labelInput: 'Página',
    data: [
        {
            id: 1,
            value: 't'
        },
        {
            id: 2,
            value: 'x'
        }
    ],
    textProp: 'value',
    valueProp: 'id'
};

class uiTester extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={12} lg={12} >
                    <p>Holaaaaaaaaaaaaaa</p>
                </Col>
            </Row>
        );
    }
}

export default uiTester;
