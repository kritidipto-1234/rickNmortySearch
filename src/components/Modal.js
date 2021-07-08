import styles from "../css/Modal.module.css";

import React, { useState, useEffect } from "react";

import GlobalContext from "../global-context";

console.log("Modal Imported");

function Modal(props) {
    const context = React.useContext(GlobalContext);

    return (
        <>
            <div onClick={context.closeModal} className={styles.overlay}></div>
            <div className={styles.Modal}>
                <div onClick={context.closeModal} className={styles.closeBtn}>
                    x
                </div>
                {props.children}
            </div>
        </>
    );
}

export default Modal;
