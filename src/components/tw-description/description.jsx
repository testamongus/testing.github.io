import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './description.css';
import reactStringReplace from 'react-string-replace';

import mdParser from 'md';
import escape from 'scratch-vm/src/util/xml-escape';

const decorate = text => {
    const isPmLink = /https:\/(\/\w+\.|\/)penguinmod\.(site\/.*|site)/sg;
    const escaped = escape(text);
    const htmlText = mdParser(escaped, {
        linksInNewTab: link => isPmLink.test(link)
    });
    // not disabling this just in case, but this is intentional
    const html = (<div dangerouslySetInnerHTML={{ __html: htmlText }} />);

    // Make links clickable
    const linkRegex = /(https?:\/\/[\w\d_\-.]{1,256}(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
    let newText = reactStringReplace(html, linkRegex, (match, i) => (
        <a
            href={match}
            rel="noreferrer"
            key={`link-${i}`} // Ensure each key is unique
        >{match}</a>
    ));

    // Make hashtags clickable
    newText = reactStringReplace(newText, /#([\w-]+)/g, (match, i) => (
        <a
            href={`https://snail-ide.js.org/#${match}`}
            key={`hashtag-${i}`} // Ensure each key is unique
        >{`#${match}`}</a>
    ));

    // Make @s clickable
    newText = reactStringReplace(newText, /@([\w-]+)/g, (match, i) => (
        <a
            href={`https://scratch.mit.edu/users/${match}`}
            key={`at-${i}`} // Ensure each key is unique
        >{`#${match}`}</a>
    ));

    // Replace text surrounded by colons with markdown image syntax
    newText = reactStringReplace(newText, /:(.*?):/g, (match, i) => (
        `![](${'https://snail-ide-object-libraries.vercel.app/files/emojis/' + match}.png)`
));

    return newText;
};

const Description = ({
    instructions,
    credits
}) => instructions !== 'unshared' && credits !== 'unshared' && (
    <div className={styles.description}>
        {instructions ? (
            <div>
                <h2 className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Instructions"
                        description="Header for instructions section of description"
                        id="tw.home.instructions"
                    />
                </h2>
                {decorate(instructions)}
            </div>
        ) : null}
        {instructions && credits ? (
            <div className={styles.divider} />
        ) : null}
        {credits && (
            <div>
                <h2 className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Notes and Credits"
                        description="Header for notes and credits section of description"
                        id="tw.home.credit"
                    />
                </h2>
                {decorate(credits)}
            </div>
        )}
    </div>
);

Description.propTypes = {
    instructions: PropTypes.string,
    credits: PropTypes.string
};

export default Description;
                
