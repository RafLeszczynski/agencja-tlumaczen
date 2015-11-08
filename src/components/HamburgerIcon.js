import React from 'react';

//TODO: toggle open class base on a prop passed to the component
//TODO: create separate stylessheet for this icon
export default class MenuButton extends React.Component {
	static propTypes = {
		toggleMenu: React.PropTypes.func.isRequired
	};

	render() {
		let {toggleMenu} = this.props;

		return (
			<a href='' title='menu' className='menu-button' onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</a>
		);
	}
}
