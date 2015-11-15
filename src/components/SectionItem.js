import React from 'react';
import Radium from 'radium';
import Button from 'components/Button';
import theme from 'theme';

@Radium
class SectionItem extends React.Component {
    render() {
        let header,
            description;

        if (this.props.item.title) {
            header = <h3 style={[styles.header, styles.spacing]}>{this.props.item.title}</h3>;
        }

        if (this.props.item.description) {
            description = <p style={[styles.description, styles.spacing]}>{this.props.item.description}</p>;
        }

        return (
            <div style={[styles.base]}>
                {header}
                {description}
                {this.props.item.details.map((detail, index) => {
                    return <Button key={index} name={detail.title}/>
                })}
            </div>
        );
    }
}

const styles = {
    base: {
        margin: '0 auto',
        textAlign: 'center',

        '@media (min-width: 768px)': {
            width: 540
        }
    },
    description: {
        color: theme.brandingLightColor
    },
    header: {
        fontSize: 16,
        fontWeight: 'normal',
        textTransform: 'upperCase',

        '@media (min-width: 768px)': {
            fontSize: 18

        }
    },
    spacing: {
        marginBottom: 48
    }
};

export default SectionItem;
