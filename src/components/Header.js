import React from 'react';
import Radium from 'radium';
import Button from 'components/Button';
import Navigation from 'components/Navigation';
import theme from 'theme';

@Radium
class Header extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string.isRequired,
        actionButtonName: React.PropTypes.string.isRequired,
        fixedHeader: React.PropTypes.bool.isRequired,
        navLinks: React.PropTypes.array.isRequired
    };

    componentWillUpdate(nextProps, nextState) {
        if(!nextProps.fixedHeader) {
            //this.setState({
            //    fadeOut: true
            //})
        }
    }

    render() {
        let {title, subtitle, actionButtonName, fixedHeader, navLinks} = this.props;
        return (
            <header ref="header" style={[styles.base,fixedHeader && styles.fixedHeader]}>
                <Navigation links={navLinks} fixedNav={fixedHeader} />
                <hgroup style={styles.titleBase}>
                    <h1 style={[
                        styles.letterSpacingBase,
                        styles.title,
                        fixedHeader && styles.fixedTitle,
                    ]}>{title}</h1>
                    <h2 style={[styles.letterSpacingBase, styles.subTitle]}>{subtitle}</h2>
                </hgroup>
                <Button name={actionButtonName} altColor={true} big={true} />
            </header>
        );
    }
}

let fadeInKeyFrames = Radium.keyframes({
        '0%': {opacity: 0},
        '100%': {opacity: 1}
    }, 'Header');

const styles = {
    base: {
        color: theme.secondaryColor,
        backgroundColor: theme.brandingColor,
        textAlign: 'center',
        padding: `20px ${theme.sidePadding} 72px`
    },
    fixedHeader: {
        position: 'fixed',
        top: -452,
        padding: `279px ${theme.sidePadding} 72px`,
        width: '100%',
        zIndex: 2
    },
    titleBase: {
        fontFamily: 'Caviar Dreams, sans-serif',
    },
    letterSpacingBase: {
        letterSpacing: '7px'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
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
    fixedTitle: {
        '@media (min-width: 1024px)': {
            animation: `${fadeInKeyFrames} 1s ease 0s 1`,
            bottom: 20,
            fontSize: 20,
            fontWeight: 'normal',
            letterSpacing: '2px',
            lineHeight: '24px',
            margin: 0,
            position: 'absolute',
            left: 30,
            zIndex: 3
        }
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'normal',
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

export default Header;
