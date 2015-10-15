import React from 'react';
import Radium from 'radium';
import LanguageGroup from 'components/LanguageGroup';
import theme from 'theme';

@Radium
class Languages extends React.Component {
    static propTypes = {
        languages: React.PropTypes.array.isRequired,
        sideNote: React.PropTypes.string.isRequired
    };

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
        let {languages, sideNote} = this.props,
            groupedLanguages = this.groupLanguagesByLetter(languages),
            columnBreakIndex = groupedLanguages.length / 2 + 1;

        return (
            <div>
                <ul style={[styles.listPosition, styles.columns]}>
                    {groupedLanguages.map((languageGroup, index) => {
                        return <LanguageGroup alignment={index < columnBreakIndex ? 'left' : 'right'} languages={languageGroup} />
                    })}
                </ul>
                <p style={[styles.sideNote]}>{sideNote}</p>
            </div>

        );
    }
}

const styles = {
    listPosition: {
        padding: 0,
        margin: '0 auto',
        width: 288,

        '@media (min-width: 768px)': {
            width: 450

        }
    },
    columns: {
        columnCount: 2,
        columnGap: 0,
        listStyle: 'none',
        '@media (min-width: 768px)': {
            columnGap: 150
        }
    },
    sideNote: {
        color: theme.brandingLightColor,
        margin: '48px 0 0',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
};

export default Languages;