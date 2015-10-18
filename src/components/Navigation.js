import React from 'react';
import Radium from 'radium';
import {Link} from 'react-scroll';

@Radium class Navigation extends React.Component {
    static propTypes = {
        links: React.PropTypes.array.isRequired,
        fixedNav: React.PropTypes.bool.isRequired,
        scrollOffset: React.PropTypes.number.isRequired,
        scrollDuration: React.PropTypes.number.isRequired

    };
    static defaultProps = {
        scrollOffset: -142,
        scrollDuration: 500
    };

    render() {
        let {links, fixedNav, scrollDuration, scrollOffset, expandMenu} = this.props;

        return (
            <nav style={[styles.spacing, fixedNav && styles.fixedNav, expandMenu && styles.expandMenu]}>
                <ul style={[styles.listStyle]}>
                    {links.map((link) => {
                        return (
                            <li style={[styles.listItemStyle, expandMenu && styles.expandMenuList]}>
                                <Link to={link.id} spy={true} smooth={true} offset={scrollOffset}
                                      duration={scrollDuration}>{link.title}</Link>
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
    }, 'Header'),
    expandKeyFrame = Radium.keyframes({
        '0%': {
            opacity: 0,
            height: 300
        },
        '100%': {
            opacity: 1,
            height: 1000
        }
    }, 'Navigation');

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
        display: 'none',

        '@media (min-width: 1024px)': {
            bottom: 20,
            display: 'block',
            marginBottom: 116,
            right: 0,
            width: '100%',
            zIndex: 3
        }
    },
    fixedNav: {
        '@media (min-width: 1024px)': {
            animation: `${fadeInKeyFrames} 1s ease 0s 1`,
            marginBottom: 0,
            position: 'absolute',
            textAlign: 'right'
        }
    },
    expandMenu: {
        display: 'block',
        animation: `${expandKeyFrame} 1s ease 0s 1`,
        height: 1000
    },
    expandMenuList: {
        display: 'block'gg
    }
};

export default Navigation;
