import {useReducer, useEffect, useState} from "react"

const showsReducer = (prevState, action) => {

    switch (action.type) {
        case "ADD": 
            return [...prevState, action.showId]
        case "REMOVE":
            return prevState.filter(showId => showId !== action.showId)
        default:
            return prevState;
    }

}

function usePersistedReducer(reducer, initialState, key) {

    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);
        console.log("initialState: " + initialState);
        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        console.log("State: " +  (state instanceof Array));
        localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, dispatch];

}

export default function useShows(key = "shows") {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuerry(key = "lastQuerry") {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : "";
    });

    const setPersistedInput = (newState) => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    }

    return [input, setPersistedInput]
}