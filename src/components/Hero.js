import React from 'react';
import Radium from 'radium';

import theme from 'theme';

import Button from 'components/Button'

@Radium
class Hero extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string.isRequired,
        actionButton: React.PropTypes.string.isRequired,
        isMenuExpanded: React.PropTypes.bool.isRequired
    };

    render() {
        let {actionButton, isMenuExpanded, subtitle, title} = this.props,

            // styles
            heroStyles = [
                styles.layout,
                isMenuExpanded && styles.hidden
            ];

        return (
            <div style={heroStyles}>
                <hgroup style={styles.font}>
                    <h1 style={styles.title}>{title}</h1>
                    <h2 style={styles.subTitle}>{subtitle}</h2>
                </hgroup>
                <Button name={actionButton} altColor={true} big={true} />
            </div>
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
}, 'Hero'),
    fadeOutKeyFrames = Radium.keyframes({
        '0%': {
            opacity: 1
        },
        '100%': {
            opacity: 0
        }
    }, 'Hero');

const styles = {
    layout: {
        animation: `${fadeInKeyFrames} 0.5s ease 0s 1`,
        opacity: 1,
        textAlign: 'center'
    },
    hidden: {
        animation: `${fadeOutKeyFrames} 0.5s ease 0s 1`,
        opacity: 0
    },
    font: {
        color: theme.secondaryColor,
        fontFamily: 'Caviar Dreams, sans-serif'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: '7px',
        lineHeight: '60px',
        margin: '0 0 42px',

        '@media (min-width: 768px)': {
            fontSize: 48,
            letterSpacing: '9px'
        },
        '@media (min-width: 1024px)': {
            fontSize: 64,
            letterSpacing: '12px',
            lineHeight: '81px'
        }
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: '7px',
        lineHeight: '30px',
        margin: '0 0 72px',

        '@media (min-width: 768px)': {
            letterSpacing: '15px'

        },
        '@media (min-width: 1024px)': {
            fontSize: 24,
            letterSpacing: '20px',
            lineHeight: '27px',
            margin: '0 0 96px'
        }
    }
};

export default Hero;