import React from 'react';
import Radium from 'radium';
import Button from 'components/Button';
import theme from 'theme';

@Radium
class Header extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string.isRequired,
        actionButtonName: React.PropTypes.string.isRequired
    };

    render() {
        let {title, subtitle, actionButtonName} = this.props;
        return (
            <header style={styles.base}>
                <hgroup style={styles.titleBase}>
                    <h1 style={[styles.letterSpacingBase, styles.title]}>{title}</h1>
                    <h2 style={[styles.letterSpacingBase, styles.subTitle]}>{subtitle}</h2>
                </hgroup>
                <Button name={actionButtonName} altColor={true} big={true} />
            </header>
        );
    }
}

const styles = {
    base: {
        color: theme.secondaryColor,
        backgroundColor: theme.brandingColor,
        textAlign: 'center',
        padding: `72px ${theme.sidePadding}`
    },
    titleBase: {
        fontFamily: 'Caviar Dreams, sans-serif',
    },
    letterSpacingBase: {
        letterSpacing: '7px'
    },
    title: {
        fontSize: '40px',
        fontWeight: 'bold',
        lineHeight: '60px',
        margin: '0 0 16px',

        '@media (min-width: 768px)': {
            fontSize: '48px',
            letterSpacing: '9px'
        },
        '@media (min-width: 1024px)': {
            fontSize: '64px',
            letterSpacing: '12px',
            lineHeight: '81px'
        }


    },
    subTitle: {
        fontSize: '18px',
        fontWeight: 'normal',
        lineHeight: '30px',
        margin: '0 0 45px',

        '@media (min-width: 768px)': {
            letterSpacing: '15px'

        },
        '@media (min-width: 1024px)': {
            fontSize: '24px',
            letterSpacing: '20px',
            lineHeight: '27px'
        }
    }
};

export default Header;
