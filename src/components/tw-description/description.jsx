import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styles from './description.css';
import reactStringReplace from 'react-string-replace';
import mdParser from 'md';
import escape from 'scratch-vm/src/util/xml-escape';

const decorate = text => {
    // Define a regular expression to match emoji patterns
    const emojiRegex = /:(\w+):/g;
    
    // Replace emoji patterns with <img> tags
    text = text.replace(emojiRegex, (match, emojiName) => (
        <img
            key={match} // Ensure each emoji has a unique key, I hope this fixes it
            src={`https://snail-ide-object-libraries.vercel.app/files/emojis/${emojiName}.png`}
            alt={match}
            className={styles.emoji}
        />
    ));

    // Define a regular expression to match penguinmod.com links
    const isPmLink = /https:\/(\/\w+\.|\/)penguinmod\.(com\/.*|com)/sg;

    // Make links clickable, including penguinmod.com links
    const linkRegex = /(https?:\/\/[\w\d_\-.]{1,256}(?:\/(?:\S*[\w:/#[\]@$&'()*+=])?)?(?![^?!,:;\w\s]\S))/g;
    text = reactStringReplace(text, linkRegex, (match, i) => (
        <a
            href={match}
            rel="noreferrer"
            key={match + i}
        >{match}</a>
    ));

    // Make hashtags clickable
    text = reactStringReplace(text, /#([\w-]+)/g, (match, i) => (
        <a
            href={`https://snail-ide.js.org/#${match}`}
            key={match + i}
        >{`#${match}`}</a>
    ));

    // Make @s clickable
    text = reactStringReplace(text, /@([\w-]+)/g, (match, i) => (
        <a
            href={`https://scratch.mit.edu/users/${match}`}
            key={match + i}
        >{`#${match}`}</a>
    ));

    return text;
};


const Description = ({
    instructions,
    credits
}) => {
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        fetch('https://sn-bapi.vercel.app/api/emojis')
            .then(response => response.json())
            .then(data => setEmojis(data))
            .catch(error => console.error('Error fetching emojis:', error));
    }, []);

    return instructions !== 'unshared' && credits !== 'unshared' && (
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
            <div>
                <h2 className={styles.header}>
                    <FormattedMessage
                        defaultMessage="Emojis"
                        description="Header for emojis section of description"
                        id="tw.home.emojis"
                    />
                </h2>
                <div className={styles.emojis}>
                    {emojis.map((emoji, index) => (
                        <img
                            key={index}
                            src={`https://snail-ide-object-libraries.vercel.app/files/emojis/${emoji}.png`}
                            alt={emoji}
                            className={styles.emoji}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

Description.propTypes = {
    instructions: PropTypes.string,
    credits: PropTypes.string
};

export default Description;
