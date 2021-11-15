import {useState, useEffect} from 'react';
import styles from '../css/Header.module.css';

import Search from '../components/Search';

function Header({search}) {
    const [scrollY,setScrollY] = useState(0);
    const [headerActive, setHeaderActive] = useState(false);
    // const [keyword,setKeyword] = useState(search);
    const watch= () => {
        window.addEventListener('scroll', handleScroll);
    };
    const handleScroll = () => {
        setScrollY(window.scrollY);
        if(scrollY > 120) {
            setHeaderActive(true);
        } else{
            setHeaderActive(false);
        }
    };
    
    useEffect(()=>{
        watch();
        return () => {window.removeEventListener('scroll',handleScroll)};
    });

    return (
        <div id={headerActive? styles.headerActive : styles.header}>
            <Search search={search} />
        </div>
    );
}

export default Header;