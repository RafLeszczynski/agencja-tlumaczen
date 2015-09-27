import React from 'react';
import SectionHeader from 'components/SectionHeader';
import Button from 'components/Button';

class Section extends React.Component {
    setStyles() {
        return {
            backgroudColor: this.props.backgroundColor || 'white',
            padding: '48px 16px 72px'
        };
    }

    render() {
        return (
            <section id={this.props.id} style={this.setStyles()}>
                <SectionHeader title={this.props.title}/>
                {this.props.children}
            </section>
        );
    }
}

export default Section;