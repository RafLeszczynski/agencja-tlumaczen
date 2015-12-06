import 'components/forms/select.scss';
import 'components/CheckPrizeForm/CheckPrizeForm.scss';

import React from 'react';
import Select from 'react-select';

import * as messages from 'components/CheckPrizeForm/CheckPrizeForm.messages';
import {languages} from 'messages/languages.messages';
import {docsTypes} from 'messages/docTypes.messages';

import Button from 'components/Button';
import Label from 'components/forms/Label';
import InputGroup from 'components/forms/InputGroup';
import Input from 'components/forms/Input';


export default class RequestCustomPrizeForm extends React.Component {
	static sourceLangParam = 'sourceLang';
	static destinationLangParam = 'destinationLang';

	// css classes
	static checkPrizeFormClassName = 'check-prize';
	static selectClassName = 'check-prize-select';
	static selectGroupWrapperClassName = 'check-prize__select-group';
	static radioGroupClassName = 'check-prize__radio-group';

	constructor(props) {
		super(props);

		this.state = {
			translationType: messages.translationOptions[1].value,
			sourceLang: '',
			destinationLang: ''
		}
	}

	render() {
		return (
			<div className={RequestCustomPrizeForm.checkPrizeFormClassName}>
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
				id: RequestCustomPrizeForm.sourceLangParam,
				options: languages
			},
			{
				id: RequestCustomPrizeForm.destinationLangParam,
				options: languages
			}
		];
	}

	/**
	 * @desc renders select group
	 * @returns {XML}
	 */
	_renderSelectGroup() {
		return (
			<div className={RequestCustomPrizeForm.selectGroupWrapperClassName}>
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
					className={RequestCustomPrizeForm.selectClassName}
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
			<div className={RequestCustomPrizeForm.radioGroupClassName}>
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