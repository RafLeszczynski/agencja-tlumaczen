import React from 'react';

import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';

import messages from 'messages';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Header
                    title={messages.pageTitle}
                    subtitle={messages.pageSubtitle}
                    actionButtonName={messages.showOfferDetails}
                    collapsedNav={true}
                />
                <Section title={messages.officeSectionHeader} id="office">
                    {messages.offices.map((address) => {
                        return  (
                            <OfficeAddress
                                address={address}
                                showLocation={messages.showLocation}
                            />
                        );
                    })}
                </Section>
                <Section title={messages.contactSectionHeader} id="contact">
                    {messages.phones.map((number) => {
                        return (
                            <span>
                                <a href={`tel:${number}`}>{number}</a><br/>
                            </span>
                        );
                    })}
                    <span>fax: {messages.fax}</span><br/>
                    <span>{messages.email}</span>
                </Section>
            </div>
        );
    }
}

export default Main;