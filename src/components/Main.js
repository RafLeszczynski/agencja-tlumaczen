// global dependencies
import React from 'react';
import Radium from 'radium';

// react components
import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import Contact from 'components/Contact';

// local dependencies
import messages from 'messages';
import theme from 'theme';

@Radium
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expendedNav: false,
            pagesScrollPos: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pagesScrollPos !== 0) {
            window.scrollTo(0, prevState.pagesScrollPos);
        }
    }

    handleExpendedNaV() {
        let isExpended = this.state.expendedNav,
            pageScrollPos = window.scrollY;

        this.setState({
            expendedNav: !isExpended,
            pagesScrollPos: window.scrollY
        });
    }

    render() {
        return (
            <div style={[styles.fontStyles, this.state.expendedNav && styles.expendedMenu, this.state.expendedNav && {top: -this.state.pagesScrollPos}]}>
                <Header
                    title={messages.pageTitle}
                    subtitle={messages.pageSubtitle}
                    actionButtonName={messages.showOfferDetails}
                    navLinks={messages.links}
                    expendedNavHandler={this.handleExpendedNaV.bind(this)}
                />

                <Section title={messages.officeSectionHeader} id='office' flexLayout={true}>
                    {messages.offices.map((address) => {
                        let {...addressData} = address;
                        return  <OfficeAddress {...addressData} showLocation={messages.showLocation}/>;
                    })}
                </Section>

                <Section title={messages.contactSectionHeader} id='contact' even={true}>
                    <Contact {...messages.contactDetails} contactUs={messages.contactUs}/>
                </Section>

                <Section title={messages.offerSectionHeader} id='offer'>
                    {messages.offer.map((item) => {
                        return <SectionItem item={item}/>;
                    })}
                </Section>

                <Section title={messages.languageSectionHeader} id='languages'
                         description={messages.languageSectionDescription} even={true}>
                    <Languages languages={messages.languages} sideNote= {messages.otherLanguagesDescription}/>
                </Section>

                <Section title={messages.prizesSectionHeader} id='prizes'>
                    {messages.prizes.map((item) => {
                        return <SectionItem item={item}/>;
                    })}
                </Section>

                <Section title={messages.docsSectionHeader} id='docs' description={messages.docsSectionDescription}
                    even={true}>
                </Section>
            </div>
        );
    }
}

const styles = {
    fontStyles: {
        color: theme.brandingColor,
        fontFamily: 'Roboto, sans-serif',
        fontSize: theme.baselineFontSize,
        lineHeight: theme.baselineLineHeight
    },
    expendedMenu: {
        position: 'fixed',
        height: '100%',
        width: '100%'
    }
};

export default Main;
