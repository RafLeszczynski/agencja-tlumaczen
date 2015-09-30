import React from 'react';
import Radium from 'radium';
import Button from 'components/Button';

@Radium
class OfficeAddress extends React.Component {
    static propTypes = {
        city: React.PropTypes.string.isRequired,
        days: React.PropTypes.string.isRequired,
        details: React.PropTypes.string,
        hours: React.PropTypes.string.isRequired,
        postalCode: React.PropTypes.string.isRequired,
        showLocation: React.PropTypes.string.isRequired,
        street: React.PropTypes.string.isRequired
    };

    render() {
        let {city, days, details, hours, postalCode, showLocation, street} = this.props;
        return (
            <div style={[styles.layout]}>
                <p style={[styles.font, styles.spacing]}>
                    <span style={[styles.block]}>{hours}</span>
                    <span style={[styles.block, styles.dayFont]}>{days}</span>
                </p>
                <p style={[styles.font, styles.spacing]}>
                    <span style={[styles.block]}>{street}</span>
                    <span style={[styles.block]}>{postalCode} {city}</span>
                    <span style={[styles.block]}>{details}</span>
                </p>
                <Button name={showLocation} />
            </div>
        );
    }
}

const styles = {
    block: {
        display: 'block'
    },
    spacing: {
        marginBottom: 42
    },
    dayFont: {
        fontSize: 14,
        textTransform: 'uppercase'
    },
    layout: {
        textAlign: 'center'
    },
    font: {
        fontSize: 16,
        lineHeight: '23px'
    }
};

export default OfficeAddress;
