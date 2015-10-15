import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import Contact from 'components/Contact';
import messages from 'messages';
import theme from 'theme';

@Radium
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.alterHeaderPosition.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.alterHeaderPosition.bind(this));
    }

    alterHeaderPosition() {
        let headerComponent = this.refs.header,
            collapsedHeaderHeight = 56,
            fixedOffset = ReactDOM.findDOMNode(headerComponent).offsetHeight - collapsedHeaderHeight,
            shouldBeFixed = window.scrollY >= fixedOffset;

        if (this.state.fixedHeader !== shouldBeFixed) {
            this.setState({
                fixedHeader: shouldBeFixed
            });
        }
    }

    render() {
        return (
            <div style={[styles.fontStyles, this.state.fixedHeader && styles.fixedHeaderPadding]}>
                <Header
                    ref="header"
                    title={messages.pageTitle}
                    subtitle={messages.pageSubtitle}
                    actionButtonName={messages.showOfferDetails}
                    fixedHeader={this.state.fixedHeader}
                    navLinks={messages.links}
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
    fixedHeaderPadding: {
        paddingTop: 514
    }
};

export default Main;
