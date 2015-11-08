import React from 'react';

export default class MenuButton extends React.Component {
    static propTypes = {
        toggleMenu: React.PropTypes.func.isRequired,
        fixedHeader: React.PropTypes.bool.isRequired
    };

    render() {
        let {toggleMenu} = this.props;

        return (
            <a href='' title='menu' className='menu-button' onClick={toggleMenu}>menu</a>
        );
    }
}
