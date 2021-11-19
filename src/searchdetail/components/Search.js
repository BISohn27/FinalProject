import { BsXLg,BsSearch } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import '../css/Search.css';

function Search({search}) {
    const [keyword,setKeyword] = useState(search);
    const [keywordState,setKeywordState] = useState(true);
    const divRef = useRef();
    const onChange = (event) => {
        setKeyword(event.target.value);
    }
    const clickReset = () => {
        setKeyword("");
        setKeywordState(true);
    };
    // const clickSearch = () => {
    //     Router.push(`/business?search=${keyword}`);
    // }
    useEffect(()=>{
        if(typeof keyword === "string")
        if(keyword === '' || keyword.length === 0) {
            setKeywordState(true);
        }else{
            setKeywordState(false);
        }
    },[keyword]);

    return (
        <div id="searchBox" ref={divRef}>
            <div id="searchText">
                <input type="text" value={keyword} onChange={onChange}/>
            </div>
            <div id={keywordState ? "resetInactive":"reset"}>
                <BsXLg onClick={clickReset}/>
            </div>
            <div id={keywordState ? "barrierInactive":"barrierActive"}></div>
            <div id="microphone">
                <FaMicrophoneAlt/>
            </div>
            <div id="searchIcon">
                <Link id="linkSearch" to={`/businesses?search=${keyword}`}><BsSearch id="searchIcon"/></Link>
            </div>
        </div>
    );
}

export default Search;