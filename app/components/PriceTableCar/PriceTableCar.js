import React from 'react';

const dataModel = [
  {
    languages: ['angielski', 'francuski', 'niemiecki', 'rosyjski'],
    pricePN: 'od 25 PLN',
    pricePP: 'od 35 PLN',
    priceU: 'od 100 PLN'
  },
  {
    languages: ['białoruski', 'czeski', 'hiszpański', 'łacina', 'niderlandzki', 'słowacki', 'ukraiński', 'węgierski',
      'włoski'],
    pricePN: 'od 35 PLN',
    pricePP: 'od 40 PLN',
    priceU: 'od 120 PLN'
  },
  {
    languages: ['bułgarski', 'estoński', 'szwedzki', 'chorwacki', 'duński', 'grecki', 'litewski', 'łotewski',
      'norweski', 'portugalski', 'rumuński', 'serbski', 'słoweński'],
    pricePN: 'od 40 PLN',
    pricePP: 'od 45 PLN',
    priceU: 'od 130 PLN'
  },
  {
    languages: ['turecki', 'japoński', 'chiński', 'i inne'],
    custom: 'wycena indywidualna'
  }
];

function renderTableRowContent(item, index) {
  if (item.custom) {
    return (
      <tr key={index}>
        <td>{renderLanguages(item.languages)}</td>
        <td colSpan="3" className="long">{item.custom}</td>
      </tr>
      )
  } else {
    return (
      <tr key={index}>
        <td>{renderLanguages(item.languages)}</td>
        <td>{item.pricePN}</td>
        <td>{item.pricePP}</td>
        <td>{item.priceU}</td>
      </tr>
    );
  }
}

function renderLanguages(languages) {
  return (
    <ul>
      {languages.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
  );
}

export default () => {
  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>Język</th>
          <th>Tłumaczenia pisemne niepszysięgłe</th>
          <th>Tłumaczenia pisemne przysięgłe</th>
          <th>Tłumaczenia ustne</th>
        </tr>
      </thead>
      <tbody>
        {dataModel.map(renderTableRowContent)}
      </tbody>
    </table>
  );
}
