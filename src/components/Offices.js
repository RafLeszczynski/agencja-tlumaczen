require('../scss/components/offices.scss');

import React from 'react';
import Button from 'components/Button';

const Offices = ({officesData, showLocation}) => {
	return (
		<div className="offices">
			{officesData.map((officeData, index) => {
				return (
					<div key={index} className='offices__location'>
						<p>
							<span>{officeData.hours}</span>
							<span className='offices__location__working-days'>{officeData.days}</span>
						</p>
						<p>
							<span>{officeData.street}</span>
							<span>{`${officeData.postalCode} ${officeData.city}`}</span>
							<span>{officeData.details}</span>
						</p>
						<Button name={showLocation} link={true} linkUrl={officeData.mapUrl}
						        title={`${officeData.street} ${officeData.postalCode} ${officeData.city}`} />
					</div>
				);
			})}
		</div>
	);
};

Offices.propTypes = {
	officesData: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			city: React.PropTypes.string.isRequired,
			days: React.PropTypes.string.isRequired,
			details: React.PropTypes.string,
			hours: React.PropTypes.string.isRequired,
			mapUrl: React.PropTypes.string.isRequired,
			postalCode: React.PropTypes.string.isRequired,
			street: React.PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	showLocation: React.PropTypes.string.isRequired
};

export default Offices;
