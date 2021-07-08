import styles from "../css/List.module.css";

import React, { useState, useEffect } from "react";

import ResultItem from "./ResultItem";

import Card from "./Card";

function List(props) {
    const endOfResultsRef = React.useRef();
    const listRef = React.useRef();

    useEffect(() => {
        if (!props.resultInfo.next) return;
        function callBack([entries]) {
            if (entries.isIntersecting) props.fetchNextPage();
        }
        const observer = new IntersectionObserver(callBack, {
            threshold: 0.5,
            root: listRef.current,
        });
        observer.observe(endOfResultsRef.current);
        const target = endOfResultsRef.current;
        return () => {
            observer.unobserve(target);
        };
    }, [props]);

    return (
        <Card ref={listRef} className={styles.List}>
            {props.characterList.length === 0 && (
                <div className={styles.errorMsg}>No Results Found</div>
            )}
            {props.characterList.length !== 0 &&
                props.characterList.map((c) => (
                    <ResultItem key={c.id} character={c} />
                ))}
            {props.characterList.length !== 0 && props.resultInfo.next && (
                <div ref={endOfResultsRef} className={styles.resultEnd}>
                    Loading ...
                </div>
            )}
            {props.resultInfo.details !== "quickview" &&
                props.characterList.length !== 0 &&
                !props.resultInfo.next && (
                    <div className={styles.resultEnd}>End of Results</div>
                )}
            {props.resultInfo.details === "quickview" && (
                <div className={styles.resultEnd}>QuickView</div>
            )}
        </Card>
    );
}

export default List;
