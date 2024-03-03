import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './description.css';
import reactStringReplace from 'react-string-replace';

import mdParser from 'md';
import escape from 'scratch-vm/src/util/xml-escape';

const decorate = text => {
    // Define a regular expression to match emoji patterns
    const emojiRegex = /:(\w+):/g;

    // Replace emoji patterns with emoji images
    text = text.replace(emojiRegex, (match, emojiName) => (
        <img
            key={match} // Ensure each emoji has a unique key
            src={`https://snail-ide-object-libraries.vercel.app/files/emojis/${emojiName}.png`}
            alt={match}
            className={styles.emoji} // You may need to define a CSS class for styling
        />
    ));

    // Define a regular expression to match penguinmod.site links
    const isPmLink = /https:\/(\/\w+\.|\/)penguinmod\.(com\/.*|com)/sg;

    // Escape the text to prevent XSS attacks
    const escaped = escape(text);

    // Parse Markdown and ensure links open in new tab
    const htmlText = mdParser(escaped, {
        linksInNewTab: link => isPmLink.test(link)
    });

    // Make links clickable
    const linkRegex = /(https?:\/\/[\w\d_\-.]{1,256}(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
    text = reactStringReplace(htmlText, linkRegex, (match, i) => (
        <a
            href={match}
            rel="noreferrer"
            key={match + i}
        >{match}</a>
    ));

    return <div dangerouslySetInnerHTML={{ __html: text }} />;
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
