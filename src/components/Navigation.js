import React from 'react';
import Radium from 'radium';
import {Link} from 'react-scroll';

import theme from 'theme';

@Radium class Navigation extends React.Component {
    static propTypes = {
        fixedHeader: React.PropTypes.bool.isRequired,
        isMenuExpanded: React.PropTypes.bool.isRequired,
        links: React.PropTypes.array.isRequired,
        scrollOffset: React.PropTypes.number.isRequired,
        scrollDuration: React.PropTypes.number.isRequired

    };

    static defaultProps = {
        scrollOffset: -142,
        scrollDuration: 500
    };

    render() {
        let {fixedHeader, isMenuExpanded, links, scrollDuration, scrollOffset} = this.props,

        // styles
            position = [
                styles.position,
                fixedHeader && styles.fixedHeaderPosition,
                isMenuExpanded && styles.inMenuPosition
            ];

        return (
            <nav style={position}>
                <ul style={styles.list}>
                    {links.map((link) => {
                        return (
                            <li key={link.id} style={styles.listItem}>
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
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    }
}, 'Navigation');

const styles = {
    list: {
        color: theme.secondaryColor,
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    listItem: {
        display: 'block',
        padding: '10px',
        textTransform: 'uppercase',

        '@media (min-width: 1024px)': {
            display: 'inline',
            padding: '0 30px'
        }
    },
    position: {
        display: 'none',
        position: 'absolute',
        left: 0,
        textAlign: 'center',
        width: '100%',
        zIndex: 3,

        '@media (min-width: 1024px)': {
            opacity: 1,
            top: 20,
            display: 'block'
        }
    },
    inMenuPosition: {
        animation: `${fadeInKeyFrames} 0.5s ease 0s 1`,
        display: 'block',
        opacity: 1
    },
    fixedHeaderPosition: {
        bottom: 40,

        '@media (min-width: 1024px)': {
            animation: `${fadeInKeyFrames} 0.5s ease 0s 1`,
            bottom: 20,
            opacity: 1,
            textAlign: 'right',
            top: 'auto'
        }
    }
};

export default Navigation;