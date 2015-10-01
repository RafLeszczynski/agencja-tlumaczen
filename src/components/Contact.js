import React from 'react';
import Radium from 'radium';
import Button from 'components/Button';

@Radium
class Contact extends React.Component {
    static propTypes = {
        contactUs: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        fax: React.PropTypes.string.isRequired,
        phones: React.PropTypes.array.isRequired
    };

    render() {
        let {contactUs, email, fax, phones } = this.props;
        return (
            <div style={[styles.base]}>
                {phones.map((number) => {
                    return (
                        <span style={[styles.block, styles.phoneSpacing]}>
                            <a href={`tel:${number}`}>{number}</a>
                        </span>
                    );
                })}
                <span style={[styles.block, styles.faxSpacing]}>{fax}</span>
                <span style={[styles.block, styles.emailSpacing]}>{email}</span>
                <Button name={contactUs} />
            </div>
        );
    }
}

const styles = {
    base: {
        fontSize: 16,
        textAlign: 'center'
    },
    block: {
        display: 'block'
    },
    phoneSpacing: {
        marginBottom: 16
    },
    faxSpacing: {
        marginBottom: 42
    },
    emailSpacing: {
        marginBottom: 42,

        '@media (min-width: 768px)': {
            marginBottom: 72
        }
    }
};

export default Contact;