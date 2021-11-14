import {useEffect, useState, useRef, Fragment} from 'react';
import { useLocation } from 'react-router-dom';
import {FaAngleDoubleDown} from 'react-icons/fa';
import queryString from 'query-string';
import axios from 'axios';

import MapContainer from '../components/MapContainer';
import Business from '../components/Business';
import Search from '../components/Search';
import Json from '../components/dummy.json';
import styles from '../css/SearchDetail.module.css';
import ScrollTopButton from '../components/ScrollTopButton';

function SearchDetail() {
    const [loadingMain,setLoadingMain] = useState(true);
    const [businesses,setBusinesses] = useState([]);
    const [noExist, setNoExist] = useState(true);
    const [more, setMore] = useState(true);
    const [shown,setShown] = useState(0);

    const businessRef = useRef([]);
    const dataRef = useRef([]);
    const keyword = useRef("");
    const {search} = useLocation();

    const getBusinesses = async () => {
        const json = await axios({
            url: `http://localhost:8090/boot/businesses?search=${keyword.current.search}`,
            method: 'GET'
        });
        console.log(json);
        // setBusinesses(json);
        // setLoadingMain(false);
    }
    const onClick = () => {
        const sub = dataRef.current.length - shown;
        if(sub >= 5){
            setBusinesses(businesses.concat(dataRef.current.slice(shown, shown+5)));
            setShown(shown+5);
        } else if(sub>0 && sub < 5){
            setBusinesses(businesses.concat(dataRef.current.slice(shown, shown+sub)));
            setShown(shown+sub);
            setMore(false);
        } else {
            setMore(false);
        }
    }
    useEffect(()=>{
        keyword.current = queryString.parse(search);
        getBusinesses();
        dataRef.current = Json.data;
        if(dataRef.current.length >= 5){
            const json = dataRef.current.slice(0, 5);
            setShown(5);
            setBusinesses(json);
            setNoExist(false);
            setMore(true);
        } else if(dataRef.current.length >0){
            const json = dataRef.current.slice(0, dataRef.current.length);
            setShown(dataRef.current.length);
            setBusinesses(json);
            setNoExist(false);
            setMore(false);
        } else{
            setMore(false);
        }
        setLoadingMain(false);
    },[]);

    return (
        <div className={styles.wrap}>
            <header>
                <Search ss={'keyword'}/>
            </header>
            <section>
                <ScrollTopButton/>
                <div className={styles.mapWrap}>
                    <MapContainer array={businesses} references={businessRef.current} shown={shown}/>
                </div>
                <div className={styles.contentWrap}>
                    {loadingMain ? <h1>Loadings...</h1>:
                        noExist ? <h2>검색 결과가 없습니다</h2> :
                        <>
                            <div id={styles.searchFor}>{`Search For '${keyword}'`}</div>
                            {businesses.map((business,itx)=>(<Business key = {`${business.eno}${itx}`} references={businessRef} business={business}/>))}
                            {more ? 
                                <div id={styles.moreButtonWrap}>
                                    <button onClick={onClick} id={styles.moreButton}>
                                        <FaAngleDoubleDown/>
                                    </button>
                                </div>
                                :
                                <div id={styles.emptyBox}>
                                </div>
                            }
                        </>
                    }
                </div>
            </section>
            <footer>
            </footer>
        </div>
    );
}

export default SearchDetail;