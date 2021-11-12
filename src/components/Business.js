import {useRef, useEffect, useState} from 'react';
import styles from '../css/Business.module.css';
import {ProgressBar, Popover, OverlayTrigger} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from './Info';

function Business({business, references}) {
    const elementRef = useRef();
    const directionRef = useRef({});
    const [infoState, setInfoState] = useState(false);
    
    const onMouseOver = (event) => {
        if(infoState === false){
          setInfoState(true);
        }
        directionRef.current = {x:elementRef.current.getBoundingClientRect().x, y:elementRef.current.getBoundingClientRect().y};
    }
    const onMouseOut = () => {
        setInfoState(false);
    }
    const onWheel = () =>{
        setInfoState(false);
    }
    useEffect(()=>{
        references.current.push(elementRef);
    },[]);

    return (
        <div className={styles.wrap}>
            <Info direction={directionRef.current} infoState={infoState} content={business.ename}/>
            <div ref={elementRef} className={styles.img} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onWheel={onWheel}>
                <img src ={business.img} alt={business.ename}/>
            </div>
            
              <div className={styles.textBox}>
                <Link to={`/business/${business.eno}`} className={styles.link}>
                  <div className={styles.linkText}>{business.ename}</div>
                </Link>
                <div>{`${business.road_address} ${business.detail_address}`}</div>
              </div>
            <div className={styles.seatAvailable}>
            <>
              {['right'].map((placement) => (
                <OverlayTrigger
                  trigger="click"
                  key={placement}
                  placement={placement}
                  overlay={
                    <Popover id={`popover-positioned-${placement}`}>
                      <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
                      <Popover.Body>
                        <strong>Holy guacamole!</strong> Check this info.
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <ProgressBar animated className={styles.progressBar} now={business.seat/25 * 100} label={`${Math.round(business.seat/25 * 100)}%`} />
                </OverlayTrigger>
              ))}
</>
            </div>
        </div>
    );
}

export default Business;