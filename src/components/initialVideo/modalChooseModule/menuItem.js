import React, { Component, PropTypes } from "react";
import { Icon, Menu } from "semantic-ui-react";
import _ from "lodash";

class MenuItem extends Component {

    render() {
        const { iconClassName, labelText, style, fnClick } = this.props;
        const iconAndText = (
            <span>
                <Icon name={iconClassName} /> {labelText}
            </span>
        );

        return (
            <Menu.Item style={style} onClick={fnClick}>
                {iconAndText}
            </Menu.Item>
        );
    }
}

MenuItem.PropTypes = {
    labelText: PropTypes.string.isRequired,
    fnClick: PropTypes.func.isRequired
};



export default MenuItem;