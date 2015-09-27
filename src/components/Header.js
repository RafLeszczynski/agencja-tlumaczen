import React from 'react';
import Button from 'components/Button';
import theme from 'theme';

const styles = {
        base: {
            color: theme.textAltColor,
            backgroundColor: theme.brandingColor,
            textAlign: 'center',
            padding: `72px ${theme.sidePadding}`
        },
        titleBase: {
            fontFamily: 'Caviar Dreams, sans-serif',
            letterSpacing: '7px'
        },
        title: {
            fontSize: '40px',
            fontWeight: 'bold',
            lineHeight: '60px',
            margin: 0,
            marginBottom: '36px'

        },
        subTitle: {
            fontSize: '18px',
            fontWeight: 'normal',
            lineHeight: '30px',
            margin: 0,
            marginBottom: '45px'
        }
    };

class Header extends React.Component {
    render() {
        return (
            <header style={styles.base}>
                <hgroup style={styles.titleBase}>
                    <h1 style={styles.title}>{this.props.title}</h1>
                    <h2 style={styles.subTitle}>{this.props.subtitle}</h2>
                </hgroup>
                <Button name={this.props.actionButtonName} color={theme.textAltColor} />
            </header>
        );
    }
}

export default Header;
