import React, { useState, useEffect } from 'react'
import Search from '../componments/Search'
import Picture from '../componments/Picture'

const Homepage = () => {
    const [searchInput, setInput] = useState("");
    let [data, setData] = useState(null);
    let [page, setPage] = useState(1);
    let [currentSearch, setCurrentSearch] = useState("");
    const auth = "563492ad6f91700001000001a95c7f2b45c94c0d842c02a180c464f8";
    const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

    //fetch data api
    const search = async (url) =>{
        setPage(2);
        const dataFetch = await fetch(url, {
            method: "GET",
            headers:{
                Accept: "application/json",
                Authorization: auth
            }
        })
        let parseData = await dataFetch.json();
        setData(parseData.photos);
    }

    //fetch data when pageload
    useEffect(() => {
        search(intialURL);
    },[])

    //load more picture
    const morePicture = async () =>{
        let newURL;
        if(currentSearch === ''){
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
        }else{
            newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
        }

        setPage(page + 1);
        const dataFetch = await fetch(newURL, {
            method: "GET",
            headers:{
                Accept: "application/json",
                Authorization: auth
            }
        })
        let parseData = await dataFetch.json();
        setData(data.concat(parseData.photos));
    }

    //search
    useEffect(() => {
        if(currentSearch === ''){
            search(intialURL);
        }else{
            search(searchURL);
        }
    },[currentSearch])

    
    return (
        <div className="pagecont">
            <Search search={() => {
                setCurrentSearch(searchInput);
            }} setInput={setInput}/>
            <div className="pictures">
                {
                    data && data.map(pic => {
                        return <Picture data={pic} key={pic.id} />
                    })
                }
            </div>
            <div className="moreButton">
                <button onClick={morePicture}>More Picture</button>
            </div>
        </div>
    )
}

export default Homepage