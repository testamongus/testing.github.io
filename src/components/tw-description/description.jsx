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
        `<img
            src="https://snail-ide-object-libraries.vercel.app/files/emojis/${emojiName}.png"
            alt="${match}"
            class="${styles.emoji}"
        />`
    ));

    // Define a regular expression to match penguinmod.com links
    const isPmLink = /https:\/\/penguinmod\.com\/\S*/g;

    // Escape the text to prevent XSS attacks
    const escaped = escape(text);

    // Parse Markdown and ensure links open in new tab
    const htmlText = mdParser(escaped, {
        linksInNewTab: link => isPmLink.test(link)
    });

    // Make links clickable
    const linkRegex = /(https?:\/\/[\w\d_\-.]{1,256}(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
    text = reactStringReplace(htmlText, linkRegex, match => (
        `<a href="${match}" rel="noreferrer">${match}</a>`
    ));

    return { __html: text };
};


const Description = ({
    instructions,
    credits
}) => instructions !== 'unshared' && credits !== 'unshared' && (
    <div className={styles.description}>
        {instructions && (
            <div>
                <h2 className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Instructions"
                        description="Header for instructions section of description"
                        id="tw.home.instructions"
                    />
                </h2>
                <div dangerouslySetInnerHTML={decorate(instructions)} />

            </div>
        )}
        {instructions && credits && (
            <div className={styles.divider} />
        )}
        {credits && (
            <div>
                <h2 className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Notes and Credits"
                        description="Header for notes and credits section of description"
                        id="tw.home.credit"
                    />
                </h2>
                <div dangerouslySetInnerHTML={decorate(credits)} />

            </div>
        )}
    </div>
);

Description.propTypes = {
    instructions: PropTypes.string,
    credits: PropTypes.string
};

export default Description;
