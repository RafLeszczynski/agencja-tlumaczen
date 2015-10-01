import React from 'react';
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
    render() {
        return (
            <div style={[styles]}>
                <Header title={messages.pageTitle} subtitle={messages.pageSubtitle}
                        actionButtonName={messages.showOfferDetails}/>

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

                <Section title={messages.languageSectionHeader} id='language'
                         description={messages.languageSectionDescription} even={true}>
                    <Languages languages={messages.languages}/>
                    <p>{messages.otherLanguagesDescription}</p>
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
    color: theme.brandingColor,
    fontFamily: 'Roboto, sans-serif',
    fontSize: theme.baselineFontSize,
    lineHeight: theme.baselineLineHeight
};

export default Main;
