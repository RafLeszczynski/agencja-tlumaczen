import React from 'react';


class Button extends React.Component {

    setStyle() {
        let color = this.props.color || `black`;

        return {
            backgroundColor: 'transparent',
            border: `1px solid ${color}`,
            borderRadius: 1,
            color: color,
            cursor: 'pointer',
            font: '14px/20px Roboto, sans-serif',
            outline: 'none',
            padding: '10px 15px',
            textTransform: 'uppercase'
        }
    }

    render() {
        return <button style={this.setStyle()}>{this.props.name}</button>
    }
}

export default Button;
