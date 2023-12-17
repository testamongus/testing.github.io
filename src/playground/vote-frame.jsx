import React from 'react';
import styles from './vote-frame.css';

const VoteFrame = props => (
    <iframe
        className={styles.frame}
        style={props.id != '0' ? {} : { display: 'none' }}
        src={`https://snail-ide.vercel.app/embed/vote?id=${props.id}#dark=${props.darkmode}`}
    ></iframe>
);

export default VoteFrame;
