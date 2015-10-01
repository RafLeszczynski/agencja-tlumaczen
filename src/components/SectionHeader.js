import React from 'react';
import Radium from 'radium';
import theme from 'theme';

@Radium
class SectionHeader extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        even: React.PropTypes.bool
    };

    render() {
        let {title, even} = this.props;
        return (
            <h2 style={[styles.border]}>
                <span style={[styles.text, even ? styles.backgroundEven : styles.backgroundOdd]}>
                    {title}
                </span>
            </h2>
        );
    }
}

const styles = {
    border: {
        borderTop: `1px solid ${theme.brandingColor}`,
        margin: '0 auto',
        paddingBottom: 48,
        width: 290,

        '@media (min-width: 768px)': {
            margin: '0 auto',
            paddingBottom: 72,
            width: 504
        },
        '@media (min-width: 1024px)': {
            width: 664
        }
    },
    text: {
        display: `block`,
        fontSize: 16,
        fontWeight: 'normal',
        position: 'relative',
        margin: '0 55px',
        textAlign: 'center',
        textTransform: 'uppercase',
        top: '-10px',

        '@media (min-width: 768px)': {
            fontSize: 20,
            margin: '0 150px'
        },
        '@media (min-width: 1024px)': {
            margin: '0 210px'
        }
    },
    backgroundOdd: {
        backgroundColor: theme.altColor
    },
    backgroundEven: {
        backgroundColor: theme.secondaryColor
    }
};

export default SectionHeader;
