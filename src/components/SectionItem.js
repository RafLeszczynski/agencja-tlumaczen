import React from 'react';
import Button from 'components/Button';

class SectionItem extends React.Component {
    render() {
        let header,
            description;

        if (this.props.item.title) {
            header = <h3>{this.props.item.title}</h3>;
        }

        if (this.props.item.description) {
            description = <p>{this.props.item.description}</p>;
        }

        return (
            <article>
                {header}
                {description}
                {this.props.item.details.map((detail) => {
                    return <Button name={detail.title}/>
                })}
            </article>
        );
    }
}

export default SectionItem;
