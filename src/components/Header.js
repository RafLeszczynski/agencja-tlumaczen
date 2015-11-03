import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import {Element} from 'react-scroll';

import theme from 'theme';

import MenuButton from 'components/MenuButton';
import HomeLink from 'components/HomeLink';
import Navigation from 'components/Navigation';
import Hero from 'components/Hero';

@Radium class Header extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        subtitle: React.PropTypes.string.isRequired,
        actionButtonName: React.PropTypes.string.isRequired,
        navLinks: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
        expendedNavHandler: React.PropTypes.func.isRequired
    };

    static collapsedHeaderHeight = 56;
    static id = 'header';

    state = {
        fixedHeader: false,
        fixedHeaderOffset: 0,
        headerHeight: 'auto',
        isMenuExpended: false
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // TODO: add throttle to the event listener
        window.addEventListener('scroll', this.toggleHeaderPosition.bind(this));
        window.addEventListener('scroll', function() {
            this.setState({
                isMenuExpended: false
            });
        }.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.toggleHeaderPosition.bind(this));
    }

    /**
     * toggles fixed header position
     */
    toggleHeaderPosition() {
        let componentHeight = ReactDOM.findDOMNode(this).offsetHeight,
            fixedOffset = componentHeight - Header.collapsedHeaderHeight,
            shouldBeFixed = window.scrollY >= fixedOffset;

        if (this.state.fixedHeader !== shouldBeFixed) {
            this.setState({
                fixedHeader: shouldBeFixed,
                headerHeight: shouldBeFixed ? componentHeight : 'auto',
                fixedHeaderOffset: fixedOffset || 0
            });
        }
    }

    /**
     * toggles navigation menu display (for small and medium breakpoint)
     */
    toggleMenuDisplay(event) {
        event.preventDefault();

        this.setState({
            isMenuExpended: !this.state.isMenuExpended
        });
    }

    render() {
        let {actionButtonName, navLinks, subtitle, title} = this.props,

            // state
            fixedHeader = this.state.fixedHeader,
            isMenuExpanded = this.state.isMenuExpended,

            // styles
            headerHeight = {
                height: this.state.headerHeight
            },
            headerStyles = [
                styles.header,
                fixedHeader && styles.fixed,
                fixedHeader && {top: -this.state.fixedHeaderOffset},
                isMenuExpanded && fixedHeader && {top: -this.state.fixedHeaderOffset + 300}
            ];

        return (
            <div style={headerHeight}>
                <Element name={Header.id}>
                    <header style={headerStyles}>
                        <MenuButton toggleMenu={this.toggleMenuDisplay.bind(this)} fixedHeader={fixedHeader}/>
                        <HomeLink id={Header.id} isMenuExpanded={isMenuExpanded} fixedHeader={fixedHeader} title={title}/>
                        <Navigation links={navLinks} isMenuExpanded={isMenuExpanded} fixedHeader={fixedHeader}/>
                        <Hero title={title} subtitle={subtitle} actionButton={actionButtonName}
                              isMenuExpanded={isMenuExpanded}/>
                    </header>
                </Element>
            </div>
        );
    }
}

const styles = {
    header: {
        backgroundColor: theme.brandingColor,
        boxSizing: 'border-box',
        padding: `172px 16px 72px`,
        width: '100%'
    },
    menuExpanded: {
        height: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 2
    },
    fixed: {
        position: 'fixed',
        zIndex: 2
    }
};

export default Header;
