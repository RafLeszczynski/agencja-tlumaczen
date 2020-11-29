const languages = [
	{
		value: 'angielski',
		label: 'angielski'
	},
	{
		value: 'białoruski',
		label: 'białoruski'
	},
	{
		value: 'bułgarski',
		label: 'bułgarski'
	},
	{
		value: 'chiński',
		label: 'chiński'
	},
	{
		value: 'chorwacki',
		label: 'chorwacki'
	},
	{
		value: 'czeski',
		label: 'czeski'
	},
	{
		value: 'duński',
		label: 'duński'
	},
	{
		value: 'estoński',
		label: 'estoński'
	},
	{
		value: 'francuski',
		label: 'francuski'
	},
	{
		value: 'hiszpański',
		label: 'hiszpański'
	},
	{
		value: 'japoński',
		label: 'japoński'
	},
	{
		value: 'litewski',
		label: 'litewski'
	},
	{
		value: 'łacina',
		label: 'łacina'
	},
	{
		value: 'łotewski',
		label: 'łotewski'
	},
	{
		value: 'niderlandzki',
		label: 'niderlandzki'
	},
	{
		value: 'niemiecki',
		label: 'niemiecki'
	},
	{
		value: 'norweski',
		label: 'norweski'
	},
	{
		value: 'portugalski',
		label: 'portugalski'
	},
	{
		value: 'rosyjski',
		label: 'rosyjski'
	},
	{
		value: 'rumuński',
		label: 'rumuński'
	},
	{
		value: 'serbski',
		label: 'serbski'
	},
	{
		value: 'słowacki',
		label: 'słowacki'
	},
	{
		value: 'słoweński',
		label: 'słoweński'
	},
	{
		value: 'szwedzki',
		label: 'szwedzki'
	},
	{
		value: 'turecki',
		label: 'turecki'
	},
	{
		value: 'ukraiński',
		label: 'ukraiński'
	},
	{
		value: 'węgierski',
		label: 'węgierski'
	},
	{
		value: 'włoski',
		label: 'włoski'
	}
];
const docTypes = [
	{
		value: 'angielski',
		label: 'angielski'
	},
	{
		value: 'białoruski',
		label: 'białoruski'
	},
	{
		value: 'bułgarski',
		label: 'bułgarski'
	},
	{
		value: 'chiński',
		label: 'chiński'
	},
	{
		value: 'chorwacki',
		label: 'chorwacki'
	},
	{
		value: 'czeski',
		label: 'czeski'
	},
	{
		value: 'duński',
		label: 'duński'
	},
	{
		value: 'estoński',
		label: 'estoński'
	},
	{
		value: 'francuski',
		label: 'francuski'
	},
	{
		value: 'hiszpański',
		label: 'hiszpański'
	},
	{
		value: 'japoński',
		label: 'japoński'
	},
	{
		value: 'litewski',
		label: 'litewski'
	},
	{
		value: 'łacina',
		label: 'łacina'
	},
	{
		value: 'łotewski',
		label: 'łotewski'
	},
	{
		value: 'niderlandzki',
		label: 'niderlandzki'
	},
	{
		value: 'niemiecki',
		label: 'niemiecki'
	},
	{
		value: 'norweski',
		label: 'norweski'
	},
	{
		value: 'portugalski',
		label: 'portugalski'
	},
	{
		value: 'rosyjski',
		label: 'rosyjski'
	},
	{
		value: 'rumuński',
		label: 'rumuński'
	},
	{
		value: 'serbski',
		label: 'serbski'
	},
	{
		value: 'słowacki',
		label: 'słowacki'
	},
	{
		value: 'słoweński',
		label: 'słoweński'
	},
	{
		value: 'szwedzki',
		label: 'szwedzki'
	},
	{
		value: 'turecki',
		label: 'turecki'
	},
	{
		value: 'ukraiński',
		label: 'ukraiński'
	},
	{
		value: 'węgierski',
		label: 'węgierski'
	},
	{
		value: 'włoski',
		label: 'włoski'
	}
];
const translationOptions = [
	{
		value: '1',
		label: 'Dokumenty Samochodowe'
	},
	{
		value: '2',
		label: 'Ustne'
	},
	{
		value: '3',
		label: 'Pisemne przysięgłe'
	},
	{
		value: '4',
		label: 'Pisemne nieprzysięgłe'
	}
];
const sliceIndex = 1;
const sections = [
	{
		description: 'Oferujemy darmową wycenę Państwa dokumentów w 2 godziny. W odpowiedzi na wiadomość, otrzymają Państwo nie tylko dokładny koszt usługi tłumaczeniowej, ale także przybliżony termin realizacji.',
		button: 'Zamów darmową wycenę',
		modalTitle: 'Zamów darmową wycenę',
		modalProps: {
			isCustomPrizeForm: true,
			selectionOptions: [
				{
					id: 'sourceLang',
					options: languages
				},
				{
					id: 'destinationLang',
					options: languages
				}
			],
			translationOptions: translationOptions.slice(sliceIndex)
		}
	}
];

export default sections;
