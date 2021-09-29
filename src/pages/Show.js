import {useReducer ,useEffect} from "react"
import {useParams} from "react-router-dom"
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
import getAPI from "../misc/config";
import { InfoBlock, ShowPageWrapper } from "./Show.styled";


const reducer = (prevState, action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {isLoading: false, error: null, show: action.show}
        case "FETCH_FAILURE":
            return {...prevState, isLoading: false, error: action.error}
        default:
            return prevState;
    }
}

const initialState = {
    show: null,
    isLoading: true,
    error: null
}

const Show = () => {
    
    const {id} = useParams();

    const [{show, isLoading, error}, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {

        let isMounted = true;

        getAPI(`shows/${id}?embed[]=seasons&embed[]=cast`).then(result => {
                if(isMounted) {
                    dispatch( {type: "FETCH_SUCCESS", show: result} )
                }
        }).catch(err => {
            if(isMounted) {
                dispatch( {type: "FETCH_FAILURE", error: err.message} )
            }            
        });

        return () => isMounted = false;

    }, []);

    if(isLoading) {
        return <div>Data is loading...</div>
    }
    if(error) {
        return <div>Error: {error}</div>
    }
    return (
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} genres={show.genres} />
            <InfoBlock>
                <h2>Details</h2>
                <Details status={show.status} network={show.network} premiered={show.premiered} />
            </InfoBlock>
            <InfoBlock>
                <h2>Seasons</h2>
                <Seasons seasons={show._embedded.seasons} />
            </InfoBlock>
            <InfoBlock>
                <h2>Cast</h2>
                <Cast cast={show._embedded.cast} />
            </InfoBlock>
        </ShowPageWrapper>
    )    
}

export default Show