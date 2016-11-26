import React from 'react';

const OfferDetails = ({details}) => {
	return (
		<ul className='offer-details'>
			{details.map((item, index) => {
				return <li key={index}><h3>{item.title}</h3><p>{item.description && `(${item.description})`}</p></li>;
			})}
		</ul>
	);
};

OfferDetails.propTypes = {
	details: React.PropTypes.array.isRequired
};

export default OfferDetails;
