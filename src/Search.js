import React, { useState } from 'react';
import './Search.css';
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Search({ hideButtons = false,stateParam }) {
    const [{ }, dispatch] = useStateValue();
    const [input, setInput] = useState("");
    const history = useHistory();


    const search = (e) => {
        e.preventDefault();

        history.push(`/search?q=${input}`);

        dispatch({
            // eslint-disable-next-line
            type: actionTypes.SET_SEARCH_TERM,
            term: input,
        });

        //input to output
        history.push(`/search?q=${input}`);

    };

    

    return (
        <form className='search'>
            <div className='search__input'>
                <SearchIcon className='search__inputIcon' />
                {/* <Tooltip title="Search"> */}
                <input value={stateParam ? stateParam : input} onChange={(e) => setInput(e.target.value)} />
                {/* </Tooltip> */}

                {/* <Tooltip title="Search by voice"> */}
                <MicIcon />
                {/* </Tooltip> */}
            </div>

            {!hideButtons ? (
                <div className='search__buttons'>
                    <button type='submit' onClick={search} variant="outlined">Google Search</button>
                    <button variant="outlined">I'm Feeling Lucky</button>
                </div>
            ) : (
                <div className='search__buttons'>
                    <button className='search__buttonsHidden' type='submit' onClick={input.length && search} variant="outlined" >Google Search</button>
                    <button className='search__buttonsHidden' variant="outlined" >I'm Feeling Lucky</button>
                </div>
            )}

        </form>
    );
}

export default Search;