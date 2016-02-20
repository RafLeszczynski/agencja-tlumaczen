import 'components/Docs/Docs.scss';
import 'components/forms/select.scss';
import React from 'react';
import Button from 'components/Button/Button';
import Select from 'react-select';
import * as massages from 'components/Docs/Docs.messages';

export default class Docs extends React.Component {
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
		return (
			<div className="docs">
				<p>{massages.tooltip}</p>
				<Select className="docs-select"
					clearable={false}
					options={massages.docs}
					placeholder={massages.actionTitle}
					searchable={false}
					onChange={this.downloadDoc.bind(this)}
					value={this.state.initialSelectValue}
				/>
			</div>
		);
	}
}
