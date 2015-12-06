import 'components/forms/select.scss';
import 'components/CheckPrizeForm/CheckPrizeForm.scss';
import React from 'react';
import * as checkPrizeFormMessages from 'components/CheckPrizeForm/CheckPrizeForm.messages';
import * as contactFormMessages from 'components/ContactForm/ContactForm.messages';
import RadioButton from 'components/forms/RadioButton';
import SelectBlock from 'components/forms/SelectBlock';
import Button from 'components/Button/Button';
import TextField from 'components/forms/TextField';
import ContactForm from 'components/ContactForm/ContactForm';
import trimFromStart from 'helpers/trim';
import * as validator from 'helpers/validator';

export default class CheckPrizeForm extends React.Component {
	static emailFieldId = 'emailTextField';
	static textFieldId = 'textTextField';
	static fileFieldId = 'fileTextField';
	static isValidPrefix = 'isValid';

	static propTypes = {
		isCustomPrizeForm: React.PropTypes.bool,
		translationOptions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		selectionOptions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	};

	static defaultTypes = {
		isCustomPrizeForm: false
	};

	constructor(props) {
		super(props);

		this.state = {
			translationType: this.props.translationOptions[0].value,
			sourceLang: '',
			destinationLang: '',
			docType: '',
			[CheckPrizeForm.emailFieldId]: '',
			[CheckPrizeForm.textFieldId]: '',
			[CheckPrizeForm.fileFieldId]: '',
			[CheckPrizeForm.isValidPrefix + CheckPrizeForm.emailFieldId]: true,
			[CheckPrizeForm.isValidPrefix + CheckPrizeForm.textFieldId]: true
		}
	}

	render() {
		const {isCustomPrizeForm, translationOptions, selectionOptions} = this.props;

		return (
			<form className='check-prize'>
				<div className='check-prize__radio-group'>
					<p>{checkPrizeFormMessages.translationOptionsLabel}</p>
					{translationOptions.map(this._renderRadioButton, this)}
				</div>
				<div className='check-prize__select-group'>
					{selectionOptions.map(this._renderSelectBlock, this)}
				</div>
				{isCustomPrizeForm ? this._renderCustomPrizeForm() : ''}
				<Button name={checkPrizeFormMessages.getPrizeButton} />
			</form>
		);
	}

	/**
	 * @desc returns form data
	 * @returns {Array}
	 * @private
	 */
	_getFormData() {
		return [
			{
				id: CheckPrizeForm.emailFieldId,
				label: contactFormMessages.emailLabel,
				type: 'email',
				validationErrorMsg: contactFormMessages.wrongEmailFormat
			},
			{
				id: CheckPrizeForm.textFieldId,
				label: contactFormMessages.textLabel,
				multiline: true,
				validationErrorMsg: contactFormMessages.emptyInputError
			},
			{
				id: CheckPrizeForm.fileFieldId,
				label: this.state[CheckPrizeForm.fileFieldId] || contactFormMessages.fileLabel,
				type: 'file'
			}
		];
	}

	/**
	 * @desc updates state
	 * @param {String} param
	 * @param {String} value
	 */
	_handlerOnSelectChange(param, value) {
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
	 * @desc handles TextField and Textarea value changes
	 * @param {Event} event
	 * @private
	 */
	_handlerChange(event) {
		const target = event.target;

		this.setState({
			[target.id]: trimFromStart(target.value)
		});
	}

	/**
	 * @desc handles validation on blur
	 * @param event
	 * @private
	 */
	_handlerBlur(event) {
		const target = event.target,
				value = target.value,
				isEmail = target.type === 'email';

		this.setState({
			[CheckPrizeForm.isValidPrefix + target.id]: isEmail && validator.validateEmail(value) ||
			!isEmail && value !== ''
		})
	}

	/**
	 * @desc renders select block
	 * @param {Object} select
	 * @param {Number} index
	 * @returns {XML}
	 */
	_renderSelectBlock(select, index) {
		const id = select.id;

		return (
			<SelectBlock
				className='check-prize-select'
				id={id}
				key={index}
				label={checkPrizeFormMessages[id]}
				onChange={this._handlerOnSelectChange.bind(this, id)}
				options={select.options}
				placeholder={checkPrizeFormMessages.selectPlaceholder}
				value={this.state[id]}
			/>
		);
	}

	/**
	 * @desc renders radio button
	 * @param {Object} option
	 * @param {Number} index
	 * @returns {XML}
	 */
	_renderRadioButton(option, index) {
		const id = checkPrizeFormMessages.translationOptionsName + index,
			value = option.value;

		return (
			<RadioButton
				key={index}
				id={id}
				value={value}
				isChecked={value === this.state.translationType}
				label={option.label}
				name={checkPrizeFormMessages.translationOptionsName}
				onClick={this._handlerOnRadioClick.bind(this, value)}
			/>
		)
	}

	/**
	 * @desc renders custom check prize form content
	 * @returns {XML}
	 * @private
	 */
	_renderCustomPrizeForm() {
		return (
			<div className='check-prize__custom-group'>
				{this._getFormData().map(this._renderFormItem, this)}
			</div>
		)
	}

	/**
	 * @desc renders form item
	 * @param {Object} formItem
	 * @param {Number} index
	 * @returns {XML}
	 * @private
	 */
	_renderFormItem(formItem, index) {
		const id = formItem.id;

		return (
			<TextField
				key={index}
				multiline={formItem.multiline}
				id={id}
				type={formItem.type}
				label={formItem.label}
				isValid={this.state[ContactForm.isValidPrefix + id]}
				validationErrorMsg={formItem.validationErrorMsg}
				value={this.state[id]}
				onChange={this._handlerChange.bind(this)}
				onBlur={this._handlerBlur.bind(this)}
			/>
		);
	}
}
