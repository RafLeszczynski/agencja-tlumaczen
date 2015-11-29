import 'components/forms/select.scss';
import 'components/checkPrize/checkPrizeForm.scss';
import React from 'react';
import {languages} from 'messages/languages.messages';
import {docsTypes} from 'messages/docTypes.messages';
import * as messages from 'messages/checkPrizeForm.messages';
import Select from 'react-select';
import Button from 'components/Button';
import Label from 'components/forms/Label';
import InputGroup from 'components/forms/InputGroup';
import Input from 'components/forms/Input';


export default class CheckPrizeForm extends React.Component {
	static sourceLangParam = 'sourceLang';
	static destinationLangParam = 'destinationLang';
	static docTypeLangParam = 'docType';

	// css classes
	static checkPrizeFormClassName = 'checkPrize';
	static selectClassName = 'checkPrize-select';
	static selectGroupWrapperClassName = 'check-prize__select-group';
	static radioGroupClassName = 'check-prize__radio-group';

	constructor(props) {
		super(props);

		this.state = {
			translationType: messages.translationOptions[0].value,
			sourceLang: '',
			destinationLang: '',
			docType: ''
		}
	}

	render() {
		return (
				<div className={CheckPrizeForm.checkPrizeFormClassName}>
					{this._renderRadioGroup()}
					{this._renderSelectGroup()}
					<Button name={messages.getPrizeButton} />
				</div>
		);
	}

	/**
	 * @desc updates state
	 * @param {String} param
	 * @param {String} value
	 */
	_handlerOnChange(param, value) {
		this.setState({
			[param]: value
		});
	}

	/**
	 * @desc sets translation type
	 * @param {String} value
	 */
	_handlerOnRadioClick(value) {
		this.setState({
			translationType: value
		});
	}

	/**
	 * @desc returon array of select groups data
	 * @returns {Array}
	 */
	static _getSelectGroupData() {
		return [
			{
				id: CheckPrizeForm.sourceLangParam,
				options: languages
			},
			{
				id: CheckPrizeForm.destinationLangParam,
				options: languages
			},
			{
				id: CheckPrizeForm.docTypeLangParam,
				options: docsTypes
			}
		];
	}

	/**
	 * @desc renders select group
	 * @returns {XML}
	 */
	_renderSelectGroup() {
		return (
			<div className={CheckPrizeForm.selectGroupWrapperClassName}>
				{CheckPrizeForm._getSelectGroupData().map(this._renderSelectBlock, this)}
			</div>
		);
	}

	/**
	 * @desc renders select block
	 * @param {Object} select
	 * @param {Number} index
	 * @returns {XML}
	 */
	_renderSelectBlock(select, index) {
		let inputGroupClasses = {
				'input-group_select': true
			};

		return (
			<InputGroup key={index} className={inputGroupClasses}>
				<Select
						className={CheckPrizeForm.selectClassName}
						clearable={false}
						id={select.id}
						options={select.options}
						placeholder={messages.selectPlaceholder}
						searchable={false}
						onChange={this._handlerOnChange.bind(this, select.id)}
						value={this.state[select.id]}
				/>
				<Label
						id={select.id}
						title={messages[select.id]}
				/>
			</InputGroup>
		);
	}

	/**
	 * @desc renders radio button group
	 * @returns {XML}
	 */
	_renderRadioGroup() {
		return (
			<div className={CheckPrizeForm.radioGroupClassName}>
				<p>{messages.translationOptionsLabel}</p>
				{messages.translationOptions.map(this._renderRadioButton, this)}
			</div>
		);
	}

	/**
	 * @desc renders radio button
	 * @param {Object} option
	 * @param {Number} index
	 * @returns {XML}
	 */
	_renderRadioButton(option, index) {
		let id = messages.translationOptionsName + index,
			value = option.value,
			isChecked = value === this.state.translationType,
			inputClasses = {
				input_radio: true,
				input_checked: isChecked
			},
			inputGroupClasses = {
				'input-group_radio': true
			};

		return (
			<InputGroup key={index} cssClasses={inputGroupClasses}>
				<Input
					cssClasses={inputClasses}
					defaultChecked={isChecked}
					id={id}
					name={messages.translationOptionsName}
					onClick={this._handlerOnRadioClick.bind(this, value)}
					type='radio'
					value={value}
				/>
				<Label
					id={id}
					title={option.label}
				/>
			</InputGroup>
		)
	}
}