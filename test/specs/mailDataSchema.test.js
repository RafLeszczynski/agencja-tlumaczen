import ajv from 'ajv';
import validationSchema from './../../server/mailDataSchema.json';

const validate = ajv().compile(validationSchema);

beforeEach(() => {
	validate.errors = [];
});

describe('Mail Data Schema tests', () => {
	it('passes validation for all required params', () => {
		const data = {
			title: 'test',
			message: 'test',
			email: 'test@test.test',
			name: 'test'
		};

		expect(validate(data)).toBe(true);
	});

	it('fails validation if required param is missing', () => {
		const cases = [
			{
				message: 'test',
				email: 'test@test.test',
				name: 'test'
			},
			{
				title: 'test',
				email: 'test@test.test',
				name: 'test'
			},
			{
				title: 'test',
				message: 'test',
				name: 'test'
			},
			{
				title: 'test',
				message: 'test',
				email: 'test@test.test'
			}
		];

		cases.forEach(testCase => {
			const valid = validate(testCase);
			const errors = validate.errors[0];

			expect(valid).toBe(false);
			expect(errors.keyword).toBe('required');
			Object.keys(testCase).forEach(param => expect(errors.params.missingProperty).not.toBe(param));
		});
	});

	it('fails validation for additional properties no declared in schema', () => {
		const foreignKey = 'test123';
		const data = {
			title: 'test',
			message: 'test',
			email: 'test@test.test',
			name: 'test',
			sourceLang: 'test',
			destinationLang: 'test',
			translationType: 'test',
			[foreignKey]: 'test'
		};
		const valid = validate(data);
		const errors = validate.errors[0];

		expect(valid).toBe(false);
		expect(errors.keyword).toBe('additionalProperties');
		expect(errors.params.additionalProperty).toBe(foreignKey);
	});

	it('fails validation for wrong property type', () => {
		const cases = [
			{
				data: {
					title: false,
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'title'
			},
			{
				data: {
					title: 'test',
					message: false,
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'message'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: false,
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'email'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: false,
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'name'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: false,
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'sourceLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: false,
					translationType: 'test'
				},
				invalidKey: 'destinationLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: false
				},
				invalidKey: 'translationType'
			}
		];

		cases.forEach(testCase => {
			const valid = validate(testCase.data);
			const errors = validate.errors[0];

			expect(valid).toBe(false);
			expect(errors.keyword).toBe('type');
			expect(errors.params.type).toBe('string');
			expect(errors.dataPath.includes(testCase.invalidKey)).toBe(true);
		});
	});

	it('fails validation because of property value is empty string', () => {
		const limit = 1;
		const cases = [
			{
				data: {
					title: '',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'title'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: '',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'name'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: '',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'sourceLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: '',
					translationType: 'test'
				},
				invalidKey: 'destinationLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: ''
				},
				invalidKey: 'translationType'
			}
		];

		cases.forEach(testCase => {
			const valid = validate(testCase.data);
			const errors = validate.errors[0];

			expect(valid).toBe(false);
			expect(errors.keyword).toBe('minLength');
			expect(errors.params.limit).toBe(limit);
			expect(errors.dataPath.includes(testCase.invalidKey)).toBe(true);
		});
	});
	it('fails validation because of property value is too long', () => {
		const limit = 255;
		const cases = [
			{
				data: {
					title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac' +
					' interdum leo faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed.' +
					' Phasellus libero ligula, fringilla et cursus eu, malesuada malesuada urna posuere. Lorem ipsum' +
					' dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac interdum leo' +
					' faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed. Phasellus libero' +
					' ligula, fringilla et cursus eu, malesuada malesuada urna posuere.',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'title'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac' +
					' interdum leo faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed.' +
					' Phasellus libero ligula, fringilla et cursus eu, malesuada malesuada urna posuere. Lorem ipsum' +
					' dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac interdum leo' +
					' faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed. Phasellus libero' +
					' ligula, fringilla et cursus eu, malesuada malesuada urna posuere.',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'name'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus,' +
					' ac interdum leo faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed.' +
					' Phasellus libero ligula, fringilla et cursus eu, malesuada malesuada urna posuere. Lorem ipsum' +
					' dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac interdum leo' +
					' faucibus ]a. Aenean volutpat ligula quam, sed convallis quam feugiat sed. Phasellus libero' +
					' ligula, fringilla et cursus eu, malesuada malesuada urna posuere.',
					destinationLang: 'test',
					translationType: 'test'
				},
				invalidKey: 'sourceLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor' +
					' risus, ac interdum leo faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat' +
					' sed. Phasellus libero ligula, fringilla et cursus eu, malesuada malesuada urna posuere. Lorem' +
					' ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac interdum leo' +
					' faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed. Phasellus libero' +
					' ligula, fringilla et cursus eu, malesuada malesuada urna posuere.',
					translationType: 'test'
				},
				invalidKey: 'destinationLang'
			},
			{
				data: {
					title: 'test',
					message: 'test',
					email: 'test@test.test',
					name: 'test',
					sourceLang: 'test',
					destinationLang: 'test',
					translationType: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor' +
					' risus, ac interdum leo faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat' +
					' sed. Phasellus libero ligula, fringilla et cursus eu, malesuada malesuada urna posuere. Lorem' +
					' ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur tempor risus, ac interdum leo' +
					' faucibus a. Aenean volutpat ligula quam, sed convallis quam feugiat sed. Phasellus libero' +
					' ligula, fringilla et cursus eu, malesuada malesuada urna posuere.'
				},
				invalidKey: 'translationType'
			}
		];

		cases.forEach(testCase => {
			const valid = validate(testCase.data);
			const errors = validate.errors[0];

			expect(valid).toBe(false);
			expect(errors.keyword).toBe('maxLength');
			expect(errors.params.limit).toBe(limit);
			expect(errors.dataPath.includes(testCase.invalidKey)).toBe(true);
		});
	});

	it('passes validation for empty message', () => {
		const data = {
			title: 'test',
			message: '',
			email: 'test@test.test',
			name: 'test'
		};

		expect(validate(data)).toBe(true);
	});

	it('fails validation for wrong email format', () => {
		const data = {
			title: 'test',
			message: 'test',
			email: 'test',
			name: 'test'
		};
		const invalidKey = 'email';
		const valid = validate(data);
		const errors = validate.errors[0];

		expect(valid).toBe(false);
		expect(errors.keyword).toBe('format');
		expect(errors.params.format).toBe(invalidKey);
		expect(errors.dataPath.includes(invalidKey)).toBe(true);
	});
});
