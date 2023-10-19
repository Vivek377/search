import { useState, useEffect } from 'react';
import API_KEY from './keys';

const CONTEXT_KEY = "74fd86af8c701462a";

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            fetch(
                `https://www.googleapis.com/customsearch/v1?key=AIzaSyDHwc9pQRC_2dxnPKDlkNuVkPfBvlIeNnY&cx=${CONTEXT_KEY}&q=${term} filetype:pdf`
            )
                .then(response => response.json())
                .then(result => {
                    setData(result);
                }).catch(e => console.log(e));
        };

        fetchData();
    }, [term]);

    return { data };
};

export default useGoogleSearch;
