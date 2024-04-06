import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import greenFlagIcon from './icon--green-flag.svg';
import turboFlagIcon from './icon--turbo.svg';
import styles from './green-flag.css';

const GreenFlagComponent = function (props) {
    const {
        active,
        className,
        onClick,
        title,
        ...componentProps
    } = props;

    const [showTurboFlag, setShowTurboFlag] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setShowTurboFlag(searchParams.has('turbo'));
    }, []);

    const handleShiftClick = (event) => {
        if (event.shiftKey) {
            setShowTurboFlag(prevState => !prevState);
        }
    };

    return (
        <img
            className={classNames(
                className,
                styles.greenFlag,
                {
                    [styles.isActive]: active
                }
            )}
            draggable={false}
            src={showTurboFlag ? turboFlagIcon : greenFlagIcon}
            title={title}
            onClick={onClick}
            onContextMenu={onClick}
            onMouseDown={handleShiftClick}
            {...componentProps}
        />
    );
};

GreenFlagComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};

GreenFlagComponent.defaultProps = {
    active: false,
    title: 'Go'
};

export default GreenFlagComponent;
