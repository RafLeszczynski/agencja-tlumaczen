import React from 'react';
import theme from 'theme';

const styles = {
    border: {
        borderTop: `1px solid ${theme.brandingColor}`,
        margin: '0 8px',
        paddingBottom: '48px'
    },
    text: {
        backgroundColor: 'white',
        display: `block`,
        fontSize: '16px',
        fontWeight: 'normal',
        position: 'relative',
        margin: '0 55px',
        textAlign: 'center',
        textTransform: 'uppercase',
        top: '-10px'
    }

};

class SectionHeader extends React.Component {
    render() {

        return (
            <h2 style={styles.border}>
                <span style={Object.assign({}, styles.text, {backgroundColor: this.props.bgColor})}>{this.props.title}</span>
            </h2>
        );
    }
}

export default SectionHeader;
