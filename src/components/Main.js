import React from 'react';

import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import messages from 'messages';
import theme from 'theme';

class Main extends React.Component {
    render() {
        let styles = {
            color: theme.brandingColor,
            fontSize: theme.baselineFontSize,
            lineHeight: theme.baselineLineHeight
        };

        return (
            <div style={styles}>
                <Header
                    title={messages.pageTitle}
                    subtitle={messages.pageSubtitle}
                    actionButtonName={messages.showOfferDetails}
                    collapsedNav={true}
                />

                <Section
                    title={messages.officeSectionHeader}
                    id='office'
                >
                    {messages.offices.map((address) => {
                        return  (
                            <OfficeAddress
                                address={address}
                                showLocation={messages.showLocation}
                            />
                        );
                    })}
                </Section>

                <Section
                    title={messages.contactSectionHeader}
                    id='contact'
                    bgColor={theme.secondaryColor}
                >
                    {messages.phones.map((number) => {
                        return (
                            <span>
                                <a href={`tel:${number}`}>{number}</a><br/>
                            </span>
                        );
                    })}
                    <span>fax: {messages.fax}</span><br/>
                    <span>{messages.email}</span><br/>
                    <Button name={messages.contactUs} />
                </Section>

                <Section
                    title={messages.offerSectionHeader}
                    id='offer'
                >
                    {messages.offer.map((item) => {
                        return <SectionItem item={item}/>;
                    })}
                </Section>

                <Section
                    title={messages.languageSectionHeader}
                    id='language'
                    description={messages.languageSectionDescription}
                    bgColor={theme.secondaryColor}
                >
                    <Languages languages={messages.languages}/>
                    <p>{messages.otherLanguagesDescription}</p>
                </Section>

                <Section
                    title={messages.prizesSectionHeader}
                    id='prizes'
                >
                    {messages.prizes.map((item) => {
                        return <SectionItem item={item}/>;
                    })}
                </Section>

                <Section
                    title={messages.docsSectionHeader}
                    id='docs'
                    description={messages.docsSectionDescription}
                    bgColor={theme.secondaryColor}

                    >
                </Section>
            </div>
        );
    }
}

export default Main;
