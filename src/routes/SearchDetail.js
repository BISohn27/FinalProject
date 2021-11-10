import {useEffect, useState, useRef, Fragment} from 'react';
import { useLocation } from 'react-router-dom';
import {FaArrowCircleUp, FaAngleDoubleDown} from 'react-icons/fa';
import queryString from 'query-string';
import axios from 'axios';

import MapContainer from '../components/MapContainer';
import Business from '../components/Business';
import Json from '../components/dummy.json';
import styles from '../css/SearchDetail.module.css';

function SearchDetail() {
    const [loadingMain,setLoadingMain] = useState(true);
    const [businesses,setBusinesses] = useState([]);
    const [noExist, setNoExist] = useState(true);
    const [more, setMore] = useState(true);
    const [shown,setShown] = useState(0);
    const [scrollY,setScrollY] = useState(0);
    const [btnActive, setbtnActive] = useState(false);

    const businessRef = useRef([]);
    const dataRef = useRef([]);
    const {search} = useLocation();
    const {keyword} = queryString.parse(search);

    const getBusinesses = async () => {
        // const json = await axios.get('http://www.objgen.com/json/models/UsU');
        const json = Json;
        setBusinesses(json);
        // insertPreRef(json);
        setLoadingMain(false);
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
    const watch= () => {
        window.addEventListener('scroll', handleScroll);
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
        if(scrollY > 100) {
            setbtnActive(true);
        } else{
            setbtnActive(false);
        }
    };
    const clickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);
        setbtnActive(false);
    };
    
    useEffect(()=>{
        watch();
        return () => {window.removeEventListener('scroll',handleScroll)};
    });
    useEffect(()=>{
        // getBusinesses();
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
            <button onClick={clickTop} id={btnActive? styles.btnActive : styles.btn}><FaArrowCircleUp/></button>
            <header>
                1
            </header>
            <section>
                <div className={styles.sectionWrap}>
                    <MapContainer array={businesses} references={businessRef.current}/>
                </div>
                    <div className={styles.sectionWrap}>
                    {loadingMain ? <h1>Loadings...</h1>:
                        noExist ? <h2>검색 결과가 없습니다</h2> :
                        <>
                            {businesses.map((business,itx)=>(<Business key = {`${business.eno}${itx}`} references={businessRef} business={business}/>))}
                            {more ? 
                                <div id={styles.moreButtonWrap}>
                                    <button onClick={onClick} id={styles.moreButton}>
                                        <FaAngleDoubleDown/>
                                    </button>
                                </div>
                                : null
                            }
                        </>
                    }
                </div>
            </section>
            <footer>
                1
            </footer>
        </div>
    );
}

export default SearchDetail;