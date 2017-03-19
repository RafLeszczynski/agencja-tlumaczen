import React from 'react';
import classNames from 'classnames';

const dataModel = [
	{
		languages: 'angielski',
		dr: '100 - 130 PLN',
		u: 'od 35 PLN',
		next: 'od 35 PLN'
	},
	{
		languages: 'francuski',
		dr: 'od 45 PLN',
		u: 'od 45 PLN',
		next: 'od 36 PLN'
	},
	{
		languages: 'hiszpański',
		dr: 'od 45 PLN',
		u: 'od 45 PLN',
		next: 'od 36 PLN'
	},
	{
		languages: 'niderlandzki',
		dr: 'od 45 PLN',
		u: 'od 50 PLN',
		next: 'od 45 PLN'
	},
	{
		languages: 'niemiecki',
		dr: 'od 35 PLN',
		u: 'od 35 PLN',
		next: 'od 25 PLN'
	},
	{
		languages: 'norweski',
		dr: 'od 100 PLN',
		u: 'od 55 PLN',
		next: 'od 50 PLN'
	},
	{
		languages: 'szwedzki',
		dr: 'od 100 PLN',
		u: 'od 40 PLN',
		next: 'od 45 PLN'
	},
	{
		languages: 'włoski',
		dr: 'od 65 PLN',
		u: 'od 55 PLN',
		next: 'od 36 PLN'
	},
	{
		languages: 'białoruski',
		dr: 'od 50 PLN',
		u: 'od 50 PLN',
		next: 'od 40 PLN'
	},
	{
		languages: 'bułgarski',
		dr: 'od 45 PLN',
		u: 'od 45 PLN',
		next: 'od 40 PLN'
	},
	{
		languages: 'chiński',
		dr: 'wycena indywidualna',
		u: 'wycena indywidualna',
		next: 'wycena indywidualna'
	},
	{
		languages: 'chorwacki',
		dr: 'od 45 PLN',
		u: 'od 45 PLN',
		next: 'od 35 PLN'
	}, {
		languages: 'czeski',
		dr: 'od 65 PLN',
		u: 'od 60 PLN',
		next: 'od 38 PLN'
	},
	{
		languages: 'duński',
		dr: 'od 120 PLN',
		u: 'od 40 PLN',
		next: 'od 27 PLN'
	},
	{
		languages: 'estoński',
		dr: 'od 95 PLN',
		u: 'od 55 PLN',
		next: 'od 35 PLN'
	},
	{
		languages: 'grecki',
		dr: 'od 75 PLN',
		u: 'od 45 PLN',
		next: 'od 35 PLN'
	},
	{
		languages: 'japoński',
		dr: 'od 110 PLN',
		u: 'od 65 PLN',
		next: 'od 40 PLN'
	},
	{
		languages: 'litweski',
		dr: 'od 65 PLN',
		u: 'od 40 PLN',
		next: 'od 35 PLN'
	},
	{
		languages: 'łotewski',
		dr: 'od 90 PLN',
		u: 'od 40 PLN',
		next: 'od 34 PLN'
	},
	{
		languages: 'portugalski',
		dr: 'od 65 PLN',
		u: 'od 55 PLN',
		next: 'od 35 PLN'
	}, {
		languages: 'rosyjski',
		dr: 'od 45 PLN',
		u: 'od 40 PLN',
		next: 'od 32 PLN'
	},
	{
		languages: 'rumuński',
		dr: 'od 65 PLN',
		u: 'od 40 PLN',
		next: 'od 35 PLN'
	},
	{
		languages: 'serbski',
		dr: 'od 65 PLN',
		u: 'od 40 PLN',
		next: 'od 36 PLN'
	},
	{
		languages: 'słowacki',
		dr: 'od 45 PLN',
		u: 'od 45 PLN',
		next: 'od 45 PLN'
	},

	{
		languages: 'słoweński',
		dr: 'od 65 PLN',
		u: 'od 40 PLN',
		next: 'od 34 PLN'
	}, {
		languages: 'turecki',
		dr: 'od 60 PLN',
		u: 'od 40 PLN',
		next: 'od 40 PLN'
	},
	{
		languages: 'ukraiński',
		dr: 'od 50 PLN',
		u: 'od 45 PLN',
		next: 'od 45 PLN'
	},
	{
		languages: 'węgierski',
		dr: 'od 55 PLN',
		u: 'od 55 PLN',
		next: 'od 50 PLN'
	},
	{
		languages: 'pozostałe języki',
		dr: 'wycena indywidualna',
		u: 'wycena indywidualna',
		next: 'wycena indywidualna'
	}
];

/**
 * @desc price table for car translations
 */
export default class PriceTableCar extends React.Component {
	/**
	 * @desc constructor function
	 * @param {Object} props - component props
	 * @constructor
	 * @returns {void}
	 */
	constructor(props) {
		super(props);

		this.state = {
			expended: false
		};
	}

	/**
	 * @param {Object} item - item
	 * @param {Number} index - index
	 * @returns {XML} - jsx markup
	 * @private
	 */
	_renderTableRowContent(item, index) {
		return (
			<tr key={index}>
				<td>{item.languages}</td>
				<td><span className='mobile-header'>Dowód rejestracyjny</span><span>{item.dr}</span></td>
				<td><span className='mobile-header'>Umowa</span><span>{item.u}</span></td>
				<td><span className='mobile-header'>Każdy kolejny dokument</span><span>{item.next}</span></td>
			</tr>
		);
	}

	/**
	 * @returns {void}
	 * @private
	 */
	_toggleExpand() {
		this.setState({
			expended: !this.state.expended
		});
	}

	/**
	 * @returns {XML} - jsx markup
	 */
	render() {
		const tableClassName = classNames({
			'price-table': true,
			'price-table-car': true,
			expended: this.state.expended
		});

		const arrowClassName = classNames({
			'see-more-langs': true,
			expended: this.state.expended
		});

		return (
			<div>
				<table className={tableClassName}>
					<thead>
					<tr>
						<th>Język</th>
						<th>Dowód rejestracyjny</th>
						<th>Umowa</th>
						<th>Każdy kolejny dokument</th>
					</tr>
					</thead>
					<tbody>
					{dataModel.map(this._renderTableRowContent)}
					</tbody>
				</table>
				<div className='table-expander'>
					<strong onClick={this._toggleExpand.bind(this)}>{this.state.expended ? 'mniej ' : 'więcej '}
						języków</strong>
					<svg onClick={this._toggleExpand.bind(this)} className={arrowClassName} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
						<path d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/>
						<path d='M0 0h24v24H0z' fill='none'/>
					</svg>
				</div>
			</div>
		);
	}
}
