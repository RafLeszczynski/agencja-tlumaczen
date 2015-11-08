import React from 'react';

import Header from 'components/Header';
import Section from 'components/Section';
import OfficeAddress from 'components/OfficeAddress';
import Button from 'components/Button';
import SectionItem from 'components/SectionItem';
import Languages from 'components/Languages';
import Contact from 'components/Contact';

import messages from 'messages';

export default class Application extends React.Component {
	render() {
		return (
			<div>
				<Header
					title={messages.pageTitle}
					subtitle={messages.pageSubtitle}
					actionButtonName={messages.showOfferDetails}
					navLinks={messages.links}
				/>

				<Section title={messages.officeSectionHeader} id='office' flexLayout={true}>
					{messages.offices.map((address) => {
						let {...addressData} = address;
						return <OfficeAddress {...addressData} showLocation={messages.showLocation}/>;
					})}
				</Section>

				<Section title={messages.contactSectionHeader} id='contact'>
					<Contact {...messages.contactDetails} contactUs={messages.contactUs}/>
				</Section>

				<Section title={messages.offerSectionHeader} id='offer'>
					{messages.offer.map((item) => {
						return <SectionItem item={item}/>;
					})}
				</Section>

				<Section title={messages.languageSectionHeader} id='languages'
				         description={messages.languageSectionDescription}>
					<Languages languages={messages.languages} sideNote={messages.otherLanguagesDescription}/>
				</Section>

				<Section title={messages.prizesSectionHeader} id='prizes'>
					{messages.prizes.map((item) => {
						return <SectionItem item={item}/>;
					})}
				</Section>

				<Section title={messages.docsSectionHeader} id='docs' description={messages.docsSectionDescription}>
				</Section>
			</div>
		);
	}
}
