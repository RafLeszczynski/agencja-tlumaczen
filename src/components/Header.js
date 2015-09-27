import React from 'react';
import Button from 'components/Button';

const colorBranding = '#421536',
    fontColorAlternate = 'white',
    styles = {
        color: fontColorAlternate,
        backgroundColor: colorBranding,
        textAlign: 'center',
        padding: '72px 16px'
    };

class Header extends React.Component {
    render() {
        return (
            <header style={styles}>
                <hgroup>
                    <h1>{this.props.title}</h1>

                    <h2>{this.props.subtitle}</h2>
                </hgroup>
                <Button name={this.props.actionButtonName} color={fontColorAlternate} />
            </header>
        );
    }
}

export default Header;