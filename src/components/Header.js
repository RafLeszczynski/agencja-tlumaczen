import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Button from 'components/Button';
import Navigation from 'components/Navigation';

import theme from 'theme';

@Radium
class Header extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string.isRequired,
        actionButtonName: React.PropTypes.string.isRequired,
        navLinks: React.PropTypes.array.isRequired,
        expendedNavHandler: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: false,
            fixedHeaderOffset: 0,
            headerHeight: 'auto',
            expandMenu: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.toggleHeaderPosition.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.toggleHeaderPosition.bind(this));
    }

    /**
     * toggles fixed header position
     */
    toggleHeaderPosition() {
        let collapsedHeaderHeight = 56,
            headerHeight = ReactDOM.findDOMNode(this).offsetHeight,
            fixedOffset = headerHeight - collapsedHeaderHeight,
            shouldBeFixed = window.scrollY >= fixedOffset;

        if (this.state.fixedHeader !== shouldBeFixed) {
            this.setState({
                fixedHeader: shouldBeFixed,
                headerHeight: shouldBeFixed || this.state.expandMenu ? headerHeight : 'auto',
                fixedHeaderOffset: fixedOffset ? fixedOffset : 0
            });
        }
    }

    /**
     * toggles navigation menu display (for small and medium breakpoint)
     */
    toggleMenuDisplay(event) {
        let isExpanded = this.state.expandMenu,
            headerHeight = ReactDOM.findDOMNode(this).offsetHeight;

        event.preventDefault();

        this.setState({
            expandMenu: !isExpanded,
            headerHeight: !isExpanded ? headerHeight : 'auto'
        });

        this.props.expendedNavHandler();
    }

    render() {
        let {actionButtonName, navLinks, subtitle, title} = this.props,
            fixedHeader = this.state.fixedHeader,
            wrapperStyles = {
                height: this.state.headerHeight
            },
            fadeInKeyFrames = Radium.keyframes({
                '0%': {height: this.state.headerHeight},
                '100%': {height: '100%'}
            }, 'Header'),
            innerWrapperStyles = [
                styles.base,
                !this.state.expandMenu && {height: this.state.headerHeight},
                fixedHeader && styles.fixedHeader,
                fixedHeader && {top: -this.state.fixedHeaderOffset},
                this.state.expandMenu && styles.expandMenu
                //this.state.expandMenu && {animation: `${fadeInKeyFrames} 1s ease 0s 1`}
            ],
            menuButtonStyles = [
                styles.menuButton,
                fixedHeader && styles.fixedMenuButton
            ],
            titleStyles = [
                styles.title,
                fixedHeader && styles.fixedTitle
            ];

        return (
            <header style={wrapperStyles}>
                <div style={innerWrapperStyles}>
                    <a href="" title="" style={menuButtonStyles} onClick={this.toggleMenuDisplay.bind(this)}>menu</a>
                    <Navigation links={navLinks} fixedNav={fixedHeader} expandMenu={this.state.expandMenu} />
                    <hgroup style={[styles.fontFamily, this.state.expandMenu && {display: 'none'}]}>
                        <h1 style={titleStyles}>{title}</h1>
                        <h2 style={styles.subTitle}>{subtitle}</h2>
                    </hgroup>
                    <div style={[this.state.expandMenu && {display: 'none'}]}>
                        <Button name={actionButtonName} altColor={true} big={true} />
                    </div>
                </div>

            </header>
        );
    }
}

let fadeInKeyFrames = Radium.keyframes({
    '0%': {opacity: 0},
    '100%': {opacity: 1}
}, 'Header');

const styles = {
    base: {
        boxSizing: 'border-box',
        color: theme.secondaryColor,
        backgroundColor: theme.brandingColor,
        textAlign: 'center',
        padding: `20px ${theme.sidePadding} 72px`
    },
    fixedHeader: {
        position: 'fixed',
        width: '100%',
        zIndex: 2
    },
    fontFamily: {
        fontFamily: 'Caviar Dreams, sans-serif'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: '7px',
        lineHeight: '60px',
        margin: '0 0 42px',

        '@media (min-width: 768px)': {
            fontSize: 48,
            letterSpacing: '9px'
        },
        '@media (min-width: 1024px)': {
            fontSize: 64,
            letterSpacing: '12px',
            lineHeight: '81px'
        }
    },
    fixedTitle: {
        animation: `${fadeInKeyFrames} 1s ease 0s 1`,
        bottom: 20,
        fontSize: 20,
        fontWeight: 'normal',
        left: 0,
        letterSpacing: '2px',
        lineHeight: '24px',
        margin: 0,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
        zIndex: 3,

        '@media (min-width: 768px)': {
            fontSize: 20,
            letterSpacing: '2px',
            lineHeight: '24px',
            margin: 0
        },

        '@media (min-width: 1024px)': {
            fontSize: 20,
            left: 30,
            letterSpacing: '2px',
            lineHeight: '24px',
            margin: 0,
            textAlign: 'left',
            width: 'auto'
        }
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: '7px',
        lineHeight: '30px',
        margin: '0 0 72px',

        '@media (min-width: 768px)': {
            letterSpacing: '15px'

        },
        '@media (min-width: 1024px)': {
            fontSize: 24,
            letterSpacing: '20px',
            lineHeight: '27px',
            margin: '0 0 96px'
        }
    },
    menuButton: {
        color: 'white',
        display: 'inline-block',
        position: 'absolute',
        left: 30,

        '@media (min-width: 1024px)': {
            display: 'none'
        }
    },
    fixedMenuButton: {
        animation: `${fadeInKeyFrames} 1s ease 0s 1`,
        bottom: 20,
        zIndex: 5
    },
    expandMenu: {
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '1000px',
        zIndex: 2
    }
};

export default Header;
