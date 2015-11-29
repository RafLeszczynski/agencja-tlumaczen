import React from 'react';
import classNames from 'classnames';

const InputGroup = (props) => {
	let baseClasses = {
			'input-group': true
		},
		combinedClasses = classNames(Object.assign({}, baseClasses, props.cssClasses));

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
