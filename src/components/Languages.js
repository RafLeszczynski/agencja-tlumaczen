import React from 'react';

class Languages extends React.Component {
    /**
     * @desc groups languages by letter
     * @param {Array} languages
     * @returns {Array[]}
     */
    groupLanguagesByLetter(languages) {
        let languagesMap = new Map(),
            groupedLanguages = [];

        languages.forEach((language) => {
            let aString = language.trim(),
                firstLetter = aString.charAt(0).toLowerCase();

            if (!languagesMap.has(firstLetter)) {
                languagesMap.set(firstLetter, [aString]);
            } else {
                languagesMap.get(firstLetter).push(aString);
            }
        });

        languagesMap.forEach((languageGroup) => {
            groupedLanguages.push(languageGroup);
        });


        return groupedLanguages;
    }

    render() {
        let groupedLanguages = this.groupLanguagesByLetter(this.props.languages);

        return (
            <ol>
                {groupedLanguages.map((languageGroup) => {
                    return (
                        <li>
                            {languageGroup.map((language) => {
                                return <p>{language}</p>;
                            })}
                        </li>
                    );
                })}
            </ol>
        );
    }
}

export default Languages;