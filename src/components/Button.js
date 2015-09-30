import React from 'react';
import Radium from 'radium';
import theme from 'theme';

@Radium
class Button extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        altColor: React.PropTypes.bool,
        big: React.PropTypes.bool
    };

    render() {
        let {name, altColor, big} = this.props;
        return (
                <button style={[styles.base, altColor ? styles.altColor : styles.baseColor, big && styles.big]}>
                    {name}
                </button>
            );
    }
}

const styles = {
    base: {
        backgroundColor: 'transparent',
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: 1,
        cursor: 'pointer',
        fontSize: '14px',
        lineHeight: '20px',
        outline: 'none',
        padding: '8px 15px',
        textTransform: 'uppercase'
    },
    baseColor: {
        color: theme.brandingColor,
        borderColor: theme.brandingColor
    },
    altColor: {
        color: theme.secondaryColor,
        borderColor: theme.secondaryColor
    },
    big: {
        '@media (min-width: 768px)': {
            fontSize: 16

        }
    }
};

export default Button;
