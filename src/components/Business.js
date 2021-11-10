import {useRef, useEffect} from 'react';
import styles from '../css/Business.module.css';
import {ProgressBar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function Business({business, references}) {
    const ref = useRef();
    useEffect(()=>{
        references.current.push(ref);
    },[]);
    return (
        <div className={styles.wrap} ref={ref}>
            <div className={styles.img}>
                <img src ={business.img} alt={business.ename}/>
            </div>
            <div className={styles.textBox}>
                <div>{business.ename}</div>
                <div>{`${business.road_address} ${business.detail_address}`}</div>
            </div>
            <div className={styles.seatAvailable}>
                <ProgressBar animated className={styles.progressBar} now={business.seat/25 * 100} label={`${Math.round(business.seat/25 * 100)}%`} />
            </div>
        </div>
    );
}

export default Business;