import 'components/Offices/Offices.scss';
import React from 'react';
import Button from 'components/Button/Button';
import {officesData, showLocation} from 'components/Offices/Offices.messages';

/**
 * @desc renders office item markup
 * @param {Object} data - react props
 * @param {Number} index - array index
 * @returns {XML} - jsx markup
 */
function renderOfficeItem(data, index) {
	return (
		<div key={index} className='offices__location'>
			<p>
				<span>{data.hours}</span>
				<span className='offices__location__working-days'>{data.days}</span>
			</p>
			<p>
				<span>{data.street}</span>
				<span>{`${data.postalCode} ${data.city}`}</span>
				<span>{data.details}</span>
			</p>
			<Button
				name={showLocation}
				link={true}
				linkUrl={data.mapUrl}
				title={`${data.street} ${data.postalCode} ${data.city}`}
			/>
		</div>
	);
}

export default () => {
	return (
		<div className='offices'>
			{officesData.map(renderOfficeItem)}
		</div>
	);
};
