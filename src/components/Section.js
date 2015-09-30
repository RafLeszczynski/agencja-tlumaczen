import React from 'react';
import Radium from 'radium';
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
        let {id, title, description, even} = this.props,
            sectionDescription ;

        if (description) {
            sectionDescription = <p>{description}</p>;
        }

        return (
            <section id={id} style={[styles.base, even && styles.backgroundEven]}>
                <SectionHeader title={title} even={even}/>
                {sectionDescription}
                {this.props.children}
            </section>
        );
    }
}

const styles = {
    base: {
        padding: `48px ${theme.sidePadding} 72px`

    },
    backgroundEven: {
        backgroundColor: theme.secondaryColor
    }
};

export default Section;
