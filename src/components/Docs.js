require('../scss/components/docs.scss');
require('../scss/components/select.scss');


import React from 'react';
import Button from 'components/Button';
import Select from 'react-select';

export default class Docs extends React.Component {
	static proptypes = {
		tooltip: React.PropTypes.string.isRequired,
		actionTitle: React.PropTypes.string.isRequired,
		docs: React.PropTypes.arrayOf(React.PropTypes.objectOf({
			value: React.PropTypes.string.isRequired,
			label: React.PropTypes.string.isRequired
		})).isRequired
	};

	state = {
		initialSelectValue: null
	};

	/**
	 * @desc opens document in new window
	 * @param url
	 */
	downloadDoc(url) {
		window.open(url, '_blank');

		this.setState({
			initialSelectValue: null
		});
	}

	render() {
		let {tooltip, actionTitle, docs} = this.props;

		return (
			<div className="docs">
				<p>{tooltip}</p>
				<Select className="docs-select"
				        clearable={false}
				        options={docs}
				        placeholder={actionTitle}
				        searchable={false}
				        onChange={this.downloadDoc.bind(this)}
				        value={this.state.initialSelectValue}/>
			</div>
		);
	}
}