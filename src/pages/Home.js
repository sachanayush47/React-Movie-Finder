import { useState } from "react"
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import getAPI from "../misc/config"
import { useLastQuerry } from '../misc/custom-hooks'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from "./Home.styled";

const Home = () => {

    const [input, setInput] = useLastQuerry();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState("shows");

    const isShowSearch = searchOption === "shows";

    const onInputChange = (e) => {
        console.log(e.target.value);
        setInput(e.target.value)
    }

    const onSearch = () => {
        getAPI(`search/${searchOption}?q=${input}`).then(result => setResults(result))
    }

    const isEnter = (e) => {
        // Press ENTER
        if (e.keyCode === 13) {
            onSearch();
        }
    }

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>Nothing to show</div>
        } else if (results && results.length > 0) {
            return results[0].show ? <ShowGrid data={results} /> : <ActorGrid data={results} />

        }
    }

    const onOptionChange = (e) => {
        setSearchOption(e.target.value);
    }

    return (
        <MainPageLayout>
            <SearchInput type="text" name="" id="" onChange={onInputChange} onKeyDown={isEnter} value={input} placeholder="Search..." />

            <RadioInputsWrapper>
                <div>
                    <label htmlFor="shows-search">
                        Shows
                    <input id="shows-search" type="radio" value="shows" onChange={onOptionChange} checked={isShowSearch} />
                    </label>
                </div>
                <div>
                    <label htmlFor="actors-seacrh">
                        Actor
                    <input id="actors-seacrh" type="radio" value="people" onChange={onOptionChange} checked={!isShowSearch} />
                    </label>
                </div>
            </RadioInputsWrapper>

            <SearchButtonWrapper>
                <button type="submit" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    );
}

export default Home;