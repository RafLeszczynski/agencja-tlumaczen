import React from 'react';
import Radium from 'radium';

import theme from 'theme';

@Radium class MenuButton extends React.Component {
    static propTypes = {
        toggleMenu: React.PropTypes.func.isRequired,
        fixedHeader: React.PropTypes.bool.isRequired
    };

    render() {
        let {fixedHeader, toggleMenu} = this.props,

            // styles
            menuButtonStyles = [
                styles.position,
                fixedHeader && styles.fixedHeaderPosition
        ];


        return (
            <a href="" title="menu" onClick={toggleMenu} style={menuButtonStyles}>menu</a>
        );
    }
}

let fadeInKeyFrames = Radium.keyframes({
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    }
}, 'MenuButton');

const styles = {
    position: {
        color: theme.secondaryColor,
        display: 'block',
        position: 'absolute',
        left: 30,
        top: 20,
        zIndex: 5,

        '@media (min-width: 1024px)': {
            display: 'none'
        }
    },
    fixedHeaderPosition: {
        animation: `${fadeInKeyFrames} 0.5s ease 0s 1`,
        opacity: 1,
        position: 'fixed',
        top: 15
    }
};

export default MenuButton;
