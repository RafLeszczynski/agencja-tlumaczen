import React from 'react';
import Radium from 'radium';
import theme from 'theme';

@Radium
class LanguageGroup extends React.Component {
    static propTypes = {
        languages: React.PropTypes.array.isRequired,
        alignment: React.PropTypes.string.isRequired
    };

    render() {
        let {alignment, languages} = this.props,
            indexLetter = languages[0].charAt(0),
            layoutPosition = alignment === 'left' ? styles.layoutLeft : styles.layoutRight,
            indexPosition = alignment === 'left' ? styles.indexLeft : styles.indexRight;

        return (
            <li style={[styles.layout, layoutPosition]}>
                <div style={[styles.index, indexPosition]}>{indexLetter}</div>
                <div style={[]}>
                    {languages.map((language) => {
                        return <span style={[styles.block]}>{language}</span>
                    })}
                </div>
            </li>
        );

    }
}

const listPaddingSmall = 30,
    listPaddingBig = 50,
    indexPosition = 0,
    columnBreak = 'avoid',
    styles = {
        index: {
            color: theme.brandingLightColor,
            display: 'none',

            '@media (min-width: 768px)': {
                display: 'block',
                position: 'absolute',
                textTransform: 'uppercase'
            }
        },
        indexLeft: {
            right: indexPosition
        },
        indexRight: {
            left: indexPosition
        },
        layout: {
            columnBreakInside: columnBreak,
            fontSize: 16,
            paddingBottom: 10,
            pageBreakInside: columnBreak,
            position: 'relative',
            width: 100
        },
        layoutLeft: {
            paddingRight: listPaddingSmall,
            textAlign: 'right',

            '@media (min-width: 768px)': {
                paddingRight: listPaddingBig

            }
        },
        layoutRight: {
            paddingLeft: listPaddingSmall,
            textAlign: 'left',

            '@media (min-width: 768px)': {
                paddingLeft: listPaddingBig

            }
        },

        block: {
            display: 'block'
        }
    };

export default LanguageGroup;
