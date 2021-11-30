import {useEffect, useState, Fragment} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';

import SelectionBox from '../components/SelectionBox';
import Chart from '../components/Chart';
import ScrollTopButton from '../components/ScrollTopButton';
import SalesReport from '../components/SalesReport';
import styles from '../css/Finance.module.css';

function Finance () {
    const [business, setBusiness] = useState({});
    const [yearSales,setYearSales] = useState({});
    const [quaterSales,setQuaterSales] = useState({});
    const [monthSales,setMonthSales] = useState({});
    const [timeSales,setTimeSales] = useState({});
    const [params,setParams] = useState({});
    const [salesList, setSalesList] = useState({});
    const [keyList, setKeyList] = useState([]);
    const [dataState, setDataState] = useState(false);

    const {eno} = useParams();

    const getBusiness = async () => {
        const json = await axios({
            url: `http://118.67.142.194:8080/enterprises/${eno}`,
            method: 'GET'
        });
        setBusiness(json.data);
    };
    const getSales = async () =>{
        const json = await axios({
            url: `http://localhost:8080/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}`,
            method: 'GET'
        });
        setYearSales(json.data.year);
        setQuaterSales(json.data.quater);
        setMonthSales(json.data.month);
        setTimeSales(json.data.time);
        setSalesList(json.data.saleslist);
        setKeyList(json.data.keylist);
    };
    const getMenuSales = async() =>{
        const json = await axios({
            url: `http://localhost:8080/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}&m=${params.menu}&mc=${params.menuCategory}`,
            method: 'GET'
        });
        setYearSales(json.data.year);
        setQuaterSales(json.data.quater);
        setMonthSales(json.data.month);
        setTimeSales(json.data.time);
        setSalesList(json.data.saleslist);
        setKeyList(json.data.keylist);
    }

    useEffect(()=>{
        getBusiness();
    },[]);

    useEffect(()=>{
        if(params !== {} && params.categoryType === 'sales'){
            getSales();
        } else if(params !== {} && params.categoryType === 'menu'){
            getMenuSales();
        }
    },[params])

    return (
        <div id={styles.wrap}>
            <ScrollTopButton/>
            <div id={styles.card}>
                <img id={styles.img} src={business.eimage} alt={business.ename}/>
                <h3 id={styles.namebox}>{business.ename}</h3>
                <div id={styles.addressbox}>{`${business.road_address} ${business.detail_address}`}</div>
            </div>
            
            <Fragment>
                <SelectionBox businessNum={business.eno} setParams={setParams} dataState={setDataState}/>
            </Fragment>
            <div id={styles.charwrap}>
                <Chart dataList={dataState ? yearSales.sales : null} labelList={dataState ?yearSales.label: null} rgb={'rgba(1, 151, 191, 0.5)'} title={'Sales per Year'}/>
                <Chart dataList={dataState ? quaterSales.sales: null} labelList={dataState ?quaterSales.label: null} rgb={'rgba(255, 99, 132, 0.5)'} title={'Sales per Quater'}/>
                <Chart dataList={dataState ? monthSales.sales: null} labelList={dataState ?monthSales.label: null} rgb={'rgba(0, 182, 0, 0.4)'} title={'Sales per Month'}/>
                <Chart dataList={dataState ? timeSales.sales: null} labelList={dataState ?timeSales.label: null} rgb={'rgba(240, 240, 0, 0.5)'} title={'Sales per Time'}/>
            </div>
            <SalesReport salesList={dataState ? salesList : null} keyList={dataState ? keyList : null}/>
            <footer id={styles.footer}>
            </footer>
        </div>
    );
}


export default Finance;