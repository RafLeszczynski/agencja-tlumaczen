import React from 'react';

//TODO: toggle open class base on a prop passed to the component
//TODO: create separate stylessheet for this icon
export default class MenuButton extends React.Component {
	static propTypes = {
		toggleMenu: React.PropTypes.func.isRequired
	};

	render() {
		return (
			<div className='menu-button' onClick={this.props.toggleMenu}>
				<span/>
				<span/>
				<span/>
				<span/>
			</div>
		);
	}
}
