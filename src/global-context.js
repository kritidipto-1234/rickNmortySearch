import React from "react";

const GlobalContext = React.createContext({
    closeModal: () => {},
    openModal: () => {},
    displayedCharacter: {},
    setDisplayedCharacter: () => {},
});

export default GlobalContext;
