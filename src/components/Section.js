import React from 'react';
import Radium from 'radium';
import {Element} from 'react-scroll';
import SectionHeader from 'components/SectionHeader';
import Button from 'components/Button';
import theme from 'theme';

@Radium
class Section extends React.Component {
    static propTypes = {
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string
    };
    render() {
        let {id, title, description, even, flexLayout} = this.props,
            sectionDescription ;

        if (description) {
            sectionDescription = <p style={[styles.descriptionLayout]}>{description}</p>;
        }

        return (
            <section style={[styles.base, even && styles.backgroundEven]}>
                <Element name={id}>
                    <SectionHeader title={title} even={even}/>
                    {sectionDescription}
                    <div style={[flexLayout && styles.contentLayout]}>{this.props.children}</div>
                </Element>
            </section>
        );
    }
}

const styles = {
    base: {
        padding: `48px ${theme.sidePadding} 72px`,

        '@media (min-width: 768px)': {
            padding: `72px ${theme.sidePadding} 106px`

        },
        '@media (min-width: 1024px)': {
            padding: `86px ${theme.sidePadding} 130px`
        }
    },
    contentLayout: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    backgroundEven: {
        backgroundColor: theme.secondaryColor
    },
    descriptionLayout: {
        color: theme.brandingLightColor,
        textAlign: 'center',
        margin: '0 0 48px'
    }
};

export default Section;
