import {useEffect, useState, Fragment} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';

import SelectionBox from '../components/SelectionBox';
import Chart from '../components/Chart';
import styles from '../css/Finance.module.css';

function Finance () {
    const [business, setBusiness] = useState({});
    const [sales,setSales] = useState({});
    const [params,setParams] = useState({});

    const {eno} = useParams();

    const getBusiness = async () => {
        const json = await axios({
            url: `http://118.67.142.194:8080/enterprises/${eno}`,
            method: 'GET'
        });
        setBusiness(json.data);
    };
    const getSales = async () =>{
        console.log(params);
        const json = await axios({
            url: `http://localhost:8080/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}`,
            method: 'GET'
        });
        console.log(json);
    };
    const getMenuSales = async() =>{
        const json = await axios({
            url: `http://localhost:8080/enterprises/${eno}/finance?ct=${params.categoryType}&pc=${params.periodCategory}&pt=${params.periodType}&sp=${params.startPeriod}&ep=${params.endPeriod}&m==${params.menu}&mc=${params.menuCategory}`,
            method: 'GET'
        });
        console.log(json);
    }

    useEffect(()=>{
        getBusiness();
    },[]);
    useEffect(()=>{
        if(params !== {} && params.categoryType === 'sales'){
            getSales();
        } else if(params !== {} && params.categoryType === 'menu'){
            // getMenuSales();
            console.log(params);
        }
    },[params])

    return (
    <div id={styles.wrap}>
        <h2>Analysis of The '{business.ename}'</h2>
        <Fragment>
            <SelectionBox businessNum={business.eno} setParams={setParams}/>
        </Fragment>
    </div>
    );
}


export default Finance;