import React from 'react';
import SectionHeader from 'components/SectionHeader';
import Button from 'components/Button';
import theme from 'theme';

const styles = {
    padding: `48px ${theme.sidePadding} 72px`
};

class Section extends React.Component {
    render() {
        let description = this.props.description,
            sectionDescription;

        if (description) {
            sectionDescription = <p>{description}</p>;
        }

        return (
            <section
                id={this.props.id}
                style={Object.assign({}, styles, {backgroundColor: this.props.bgColor})}
            >
                <SectionHeader title={this.props.title} bgColor={this.props.bgColor}/>
                {sectionDescription}
                {this.props.children}
            </section>
        );
    }
}

export default Section;
