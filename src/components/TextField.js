import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

export default class TextField extends React.Component {
	static propTypes = {
		email: React.PropTypes.bool,
		file: React.PropTypes.bool,
		id: React.PropTypes.string.isRequired,
		isRequired: React.PropTypes.bool,
		label: React.PropTypes.string.isRequired,
		minRows: React.PropTypes.number,
		maxRows: React.PropTypes.number,
		onChange: React.PropTypes.func.isRequired,
		validationErrorMsg: React.PropTypes.string,
		value: React.PropTypes.string.isRequired
	};

	static defaultProps = {
		minRows: 1,
		maxRows: 6
	};

	static textFieldWrapperClassName = 'form__input-group';
	static singleLineFieldClassName = 'form__input-group__input';
	static multiLineFieldClassName = 'form__input-group__textarea';
	static textFieldLabelClassName = 'form__input-group__label';
	static emptyTextFieldLabelClassName = 'form__input-group__label--empty-value';
	static textFieldValidationErrorClassName = 'form__input-group__validation-error-msg';
	static fileFiedLabelClassName = 'form__input-group__label--file';
	static fileFiedClassName = 'form__input-group__input--file';


	state = {
		isValid: true
	};

	/**
	 * @desc validates email address
	 * @param {String} emailAddress
	 * @todo: move to helpers and write tests
	 * @returns {Boolean}
	 */
	static validateEmail(emailAddress) {
		const pattern = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		return pattern.test(emailAddress);
	}

	/**
	 * @desc sets input type
	 * @returns {String}
	 */
	setFieldType() {
		return this.props.email ? 'email' : this.props.file ? 'file' : 'text';
	}

	/**
	 * @desc checks is TextField content is valid
	 */
	handlerOnBlur() {
		let {email, value} = this.props;

		this.setState({
			isValid: email && TextField.validateEmail(value) || !email && value !== ''
		});
	}

	/**
	 * @desc renders single line TextField
	 * @returns {XML}
	 */
	renderSingleLineField() {
		let {id, value, onChange, isRequired, file} = this.props,
			inputClasses = classNames({
				[TextField.singleLineFieldClassName]: true,
				[TextField.fileFiedClassName]: file
			});

		return (
			<input
				className={inputClasses}
				id={id}
				type={this.setFieldType()}
				value={value}
				onChange={onChange}
				onBlur={isRequired && this.handlerOnBlur.bind(this)}
			/>
		);
	}

	/**
	 * @desc renders multi line TextField
	 * @returns {XML}
	 */
	renderMultiLineField() {
		let {id, value, maxRows, minRows, onChange, isRequired} = this.props;

		return (
			<TextareaAutosize
				id={id}
				className={TextField.multiLineFieldClassName}
				minRows={minRows}
				maxRows={maxRows}
				value={value}
				onChange={onChange}
				onBlur={isRequired && this.handlerOnBlur.bind(this)}
			/>
		);
	}

	/**
	 * @desc renders TextField label
	 * @returns {XML}
	 */
	renderLabel() {
		let {id, label, value, file} = this.props,
			labelClasses = classNames({
				[TextField.textFieldLabelClassName]: true,
				[TextField.emptyTextFieldLabelClassName]: value !== '',
				[TextField.fileFiedLabelClassName]: file

			});

		return (
			<label className={labelClasses} htmlFor={id}>
				{label}
			</label>
		);
	}

	/**
	 * @desc checks if validation error should be rendered
	 * @returns {boolean}
	 */
	shouldRenderValidationError() {
		return !this.state.isValid && this.props.validationErrorMsg;
	}

	/**
	 * @desc renders TextField validation error
	 * @param {String} validationErrorMsg
	 * @returns {XML}
	 */
	static renderValidationError(validationErrorMsg) {
		return <span className={TextField.textFieldValidationErrorClassName}>{validationErrorMsg}</span>
	}

	render() {
		let {multiLine, validationErrorMsg} = this.props;

		return (
			<div className={TextField.textFieldWrapperClassName}>
				{multiLine ? this.renderMultiLineField() : this.renderSingleLineField()}
				{this.renderLabel()}
				{this.shouldRenderValidationError() && TextField.renderValidationError(validationErrorMsg)}
			</div>
		);
	}
}