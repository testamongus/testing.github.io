import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import styles from './ext-manager-modal.css';

const handleRemoveBtnClick = (ext, props) => {
    if (confirm("Are you sure?")) {
        props.vm.extensionManager.removeExtension(ext[0]);
        props.onClose();
    }
}

const ExtensionsManagerModalComponent = props => {
    const [loadedExtensions, setLoadedExtensions] = useState([]);

    useEffect(() => {
        const entriesArray = Array.from(props.vm.extensionManager._loadedExtensions);
        setLoadedExtensions(entriesArray);
    }, [props.vm.extensionManager]);

    return (
        <Modal
            className={styles.modalContent}
            onRequestClose={(...args) => {
                props.onClose(...args)
            }}
            contentLabel={"Extensions Manager"}
            id="extManagerModal"
        >
            <Box className={styles.body}>
                {loadedExtensions.map((ext, i) => (
                    <button key={i} class={styles.button} onClick={() => handleRemoveBtnClick(ext, props)}>Remove {props.vm.runtime["ext_" + ext[0]]["getInfo"]().name}</button>
                ))}
            </Box>
        </Modal>
    );
};

ExtensionsManagerModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    vm: PropTypes.shape({
        extensionManager: PropTypes.shape({
            removeExtension: PropTypes.func
        })
    })
};

export default injectIntl(ExtensionsManagerModalComponent);
