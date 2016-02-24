import React from 'react';
import classNames from 'classnames';

const Label = ({cssClasses, id, title}) => {
	const baseClasses = {
		'label': true
	};
	const combinedClasses = classNames(Object.assign({}, baseClasses, cssClasses));

	return (
		<label
			className={combinedClasses}
			htmlFor={id}
		>
			{title}
		</label>
	);
};

Label.propTypes = {
	cssClasses: React.PropTypes.object,
	id: React.PropTypes.string,
	title: React.PropTypes.string.isRequired
};

export default Label;
