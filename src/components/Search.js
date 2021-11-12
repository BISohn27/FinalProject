import { BsXLg,BsSearch } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import {useState, useRef, useEffect} from "react";
import '../css/Search.css';

function Search({ss}) {
    const [keyword,setKeyword] = useState(ss);
    const [keywordState,setKeywordState] = useState(true);
    const divRef = useRef();
    
    const onChange = (event) => {
        setKeyword(event.target.value);
    }
    const onClick = () => {
        setKeyword("");
        setKeywordState(true);
    }
    useEffect(()=>{
        if(keyword === '' || keyword.length === 0) {
            console.log(1);
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
                <BsXLg onClick={onClick}/>
            </div>
            <div id={keywordState ? "barrierInactive":"barrierActive"}></div>
            <div id="microphone">
                <FaMicrophoneAlt/>
            </div>
            <div id="searchIcon">
                <BsSearch/>
            </div>
        </div>
    );
}

export default Search;