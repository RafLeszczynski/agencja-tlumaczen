import React from 'react';
import classNames from 'classnames';

const InputGroup = props => {
	const baseClasses = {
		'input-group': true
	};
	const combinedClasses = classNames(Object.assign({}, baseClasses, props.cssClasses));

	return (
		<div className={combinedClasses}>
			{props.children}
		</div>
	);
};

InputGroup.propTypes = {
	cssClasses: React.PropTypes.object
};

export default InputGroup;
