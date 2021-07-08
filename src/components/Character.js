import styles from "../css/Character.module.css";

import React, { useState, useEffect } from "react";

import GlobalContext from "../global-context";

import Modal from "./Modal";

console.log("Character Imported");

//React.memo doesnt make a difference here
const Character = React.memo((props) => {
    const context = React.useContext(GlobalContext);

    return (
        <Modal>
            <div className={styles.Character}>
                <div className={styles.intro}>
                    <img alt=":(" src={context.displayedCharacter.image} />
                    <div>
                        <div className={styles.name}>
                            {context.displayedCharacter.name}
                        </div>
                        <div className={styles.statusSpecies}>
                            {context.displayedCharacter.status}-
                            {context.displayedCharacter.species}
                        </div>
                    </div>
                </div>
                <hr />
                <div className={styles.info}>
                    <div>
                        <div className={styles.infoLabel}>Gender</div>
                        <div>{context.displayedCharacter.gender}</div>
                    </div>
                    <div>
                        <div className={styles.infoLabel}>Location</div>
                        <div>{context.displayedCharacter.location.name}</div>
                    </div>
                    <div>
                        <div className={styles.infoLabel}>Species</div>
                        <div>{context.displayedCharacter.species}</div>
                    </div>
                    <div>
                        <div className={styles.infoLabel}>Origin</div>
                        <div>{context.displayedCharacter.origin.name}</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default Character;
