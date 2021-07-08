import styles from "../css/Card.module.css";

import React, { useState, useEffect } from "react";

const Card = React.forwardRef((props, ref) => {
    return (
        <div
            ref={ref}
            style={props.styles}
            className={styles.Card + " " + props.className}
        >
            {props.children}
        </div>
    );
});

export default Card;
