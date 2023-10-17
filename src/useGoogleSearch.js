import { useState, useEffect } from 'react';
import API_KEY from './keys';

const CONTEXT_KEY = "74fd86af8c701462a";

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            fetch(
                `https://www.googleapis.com/customsearch/v1?key=AIzaSyBmIzsh3l5oTO9et-wJPXjBfalg4xniFAY&cx=${CONTEXT_KEY}&q=${term}`
            )
                .then(response => response.json())
                .then(result => {
                    setData(result);
                });
        };

        fetchData();
    }, [term]);

    return { data };
};

export default useGoogleSearch;
