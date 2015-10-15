import React from 'react';
import Radium from 'radium';
import {Link} from 'react-scroll';

@Radium
class Navigation extends React.Component {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        fixedNav: React.PropTypes.bool.isRequired
    };

    render () {
        let {links, fixedNav} = this.props;

        return (
            <nav style={[styles.spacing, fixedNav && styles.fixedNav]}>
                <ul style={[styles.listStyle]}>
                    {links.map((link) => {
                        return (
                            <li style={[styles.listItemStyle]}>
                                <Link to={link.id} spy={true} smooth={true} offset={-142} duration={500}>{link.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    }
}

let fadeInKeyFrames = Radium.keyframes({
    '0%': {opacity: 0},
    '100%': {opacity: 1}
}, 'Header');

const styles = {
    listStyle: {
        listStyle: 'none',
        margin: 0
    },
    listItemStyle: {
        display: 'inline',
        padding: '0 30px',
        textTransform: 'uppercase'
    },
    spacing: {
        marginBottom: 116,
        width: '100%'
    },
    fixedNav: {
        animation: `${fadeInKeyFrames} 1s ease 0s 1`,
        bottom: 20,
        marginBottom: 0,
        position: 'absolute',
        right: 30,
        textAlign: 'right',
        zIndex: 3
    }
};

export default Navigation;
