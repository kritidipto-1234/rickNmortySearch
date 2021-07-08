import styles from "../css/ResultItem.module.css";

import React, { useState, useEffect } from "react";

import GlobalContext from "../global-context";

const ResultItem = (props) => {
    let statusColor;
    if (props.character.status.toUpperCase() === "ALIVE") statusColor = "green";
    if (props.character.status.toUpperCase() === "DEAD") statusColor = "red";
    if (props.character.status.toUpperCase() === "UNKNOWN")
        statusColor = "gray";

    const context = React.useContext(GlobalContext);

    const clickHandler = React.useCallback(
        (e) => {
            context.openModal();
            context.setDisplayedCharacter(props.character);
        },
        [props, context]
    );

    return (
        <div onClick={clickHandler} className={styles.ResultItem}>
            <img src={props.character.image} alt=":(" />
            <div className={styles.name}>{props.character.name}</div>
            <div className={styles.species}>
                <span
                    style={{ backgroundColor: statusColor }}
                    className={styles.statusDot}
                ></span>
                &nbsp;
                {props.character.status}-{props.character.species}
            </div>
        </div>
    );
};

export default ResultItem;
