import React from 'react';
import Radium from 'radium';
import {Link} from 'react-scroll';

import theme from 'theme';

@Radium class HomeLink extends React.Component {
    static propTypes = {
        fixedHeader: React.PropTypes.bool.isRequired,
        id: React.PropTypes.string.isRequired,
        isMenuExpanded: React.PropTypes.bool.isRequired,
        scrollOffset: React.PropTypes.number.isRequired,
        scrollDuration: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        scrollOffset: -142,
        scrollDuration: 500
    };


    render() {
        let {fixedHeader, id, isMenuExpanded, scrollDuration, scrollOffset, title} = this.props,

            // styles
            homeLinkStyles = [
                styles.font,
                styles.display,
                styles.position,
                fixedHeader && styles.fixedHeaderDisplay
            ];

        return (
            <div style={homeLinkStyles}>
                <Link to={id} spy={true} smooth={true} offset={scrollOffset}
                      duration={scrollDuration}>{title}</Link>
            </div>
        );
    }
}

let fadeInKeyFrames = Radium.keyframes({
    '0%': {
        opacity: 0,
        zIndex: -1

    },
    '100%': {
        opacity: 1,
        zIndex: 4
    }
}, 'HomeLink');

const styles = {
    display: {
        opacity: 0,
        zIndex: -1
    },
    fixedHeaderDisplay: {
        animation: `${fadeInKeyFrames} 0.5s ease 0s 1`,
        opacity: 1,
        zIndex: 4
    },
    font: {
        color: theme.secondaryColor,
        fontFamily: 'Caviar Dreams, sans-serif',
        fontSize: 20,
        fontWeight: 'normal',
        letterSpacing: '2px',
        lineHeight: '24px'
    },
    position: {
        top: 15,
        position: 'fixed',
        left: 0,
        textAlign: 'center',
        width: '100%',

        '@media (min-width: 1024px)': {
            left: 30,
            width: 'auto'
        }
    }
};

export default HomeLink;
