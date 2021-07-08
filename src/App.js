import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import GlobalContext from "./global-context";

import axios from "axios";
import React, { Suspense, useEffect } from "react";
import List from "./components/List";
import { Input } from "antd";
const { Search } = Input;
const Character = React.lazy(() => import("./components/Character"));

function App() {
    const [results, setResults] = React.useState({
        characterList: [],
        resultInfo: {},
    });
    const [isModalDisplayed, setIsModalDisplayed] = React.useState(false);
    const [displayedCharacter, setDisplayedCharacter] = React.useState({});
    const debounceTimer = React.useRef();

    async function fetchQuickView() {
        const result = await axios({
            method: "GET",
            url: `https://rickandmortyapi.com/api/character/?name=Rick%20Sanchez`,
        });
        setResults({
            characterList: result.data.results,
            resultInfo: { details: "quickview" },
        });
    }

    useEffect(() => {
        fetchQuickView();
    }, []);

    async function newSearch(e) {
        console.log("searching", e.target.value);
        if (e.target.value === "") return fetchQuickView();
        try {
            const result = await axios({
                method: "GET",
                url: `https://rickandmortyapi.com/api/character/?name=${e.target.value}`,
            });
            setResults({
                characterList: result.data.results,
                resultInfo: result.data.info,
            });
        } catch (e) {
            console.log(e.message);
            setResults({ characterList: [], resultInfo: {} });
        }
    }

    async function fetchNextPage() {
        try {
            const result = await axios({
                method: "GET",
                url: results.resultInfo.next,
            });
            setResults((prev) => ({
                characterList: [...prev.characterList, ...result.data.results],
                resultInfo: result.data.info,
            }));
        } catch (e) {
            console.log(e.message);
            setResults({ characterList: [], resultInfo: {} });
        }
    }

    async function debouncedSearch(e) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(newSearch.bind(null, e), 700);
    }

    return (
        <GlobalContext.Provider
            value={{
                closeModal: setIsModalDisplayed.bind(null, false),
                openModal: setIsModalDisplayed.bind(null, true),
                displayedCharacter,
                setDisplayedCharacter,
            }}
        >
            <div className="App">
                {isModalDisplayed && (
                    <Suspense
                        fallback={
                            <div className="characterSuspenseText">
                                Loading...
                            </div>
                        }
                    >
                        <Character />
                    </Suspense>
                )}
                <h1 className="heading">Rick and Morty Search</h1>
                <Search
                    onChange={debouncedSearch}
                    placeholder="Search for Rick n Morty characters"
                    style={{ width: 300 }}
                    enterButton
                />
                <List
                    fetchNextPage={fetchNextPage}
                    characterList={results.characterList}
                    resultInfo={results.resultInfo}
                />
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
