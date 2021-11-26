import {useState,useEffect,Fragment} from 'react';
import axios from 'axios';

import styles from '../css/SelectionBox.module.css';
import Selection from './Selection';
import SelectionForPicker from './SelectionForPicker';

function SelectionBox({businessNum,setParams}) {
    const [firstCategoryValue, setFirstCategoryValue] = useState('');
    const [secondCategoryValue, setSecondCategoryValue] = useState('');
    const [thirdCategoryValue, setThirdCategoryValue] = useState('');
    const [fourthCategoryValue, setFourthCategoryValue] = useState('');
    const [secondCategory,setSecondCategory] = useState([]);
    const [thirdCategory, setThirdCategory] = useState([]);
    const [fourthCategory, setFourthCategory] = useState([]);
    const [firstCategoryState, setFirstCategoryState] = useState(0);

    const [categoryType,setCategoryType] = useState('');
    const [periodCategory,setPeriodCategory] = useState('');
    const [menuCategory, setMenuCategory] = useState('');
    const [menu, setMenu] = useState('');
    const [periodType,setPeriodType] = useState('');
    const [startPeriod, setStartPeriod] = useState(null);
    const [endPeriod, setEndPeriod] = useState(null);

    const periodArray = ['년도별 매출', '분기별 매출', '월별 매출', '일별 매출','시간별 매출'];

    const getMenuCategories = async () =>{
        const json = await axios({
            url: `http://118.67.142.194:8080/enterprises/${businessNum}/categories`,
            method: 'GET'
        });
        setSecondCategory(json.data.categories);
    }
    const getMenuByCaterory = async () => {
        const json = await axios({
            url: `http://118.67.142.194:8080/enterprises/${businessNum}/categories/${secondCategoryValue}`,
            method: 'GET'
        });
        setThirdCategory(json.data);
    }
    
    useEffect(()=>{
        setStartPeriod(null);
        setEndPeriod(null);
        setFirstCategoryState(0);
        setSecondCategory([]);
        setSecondCategoryValue('');
        setFourthCategory([]);
        setThirdCategory([]);
        setFourthCategoryValue('');
        setThirdCategoryValue('');
        if(firstCategoryValue ==='총 매출'){
            setSecondCategory(periodArray);
            setFirstCategoryState(1);
            setCategoryType('sales');
        }else if(firstCategoryValue === '메뉴별 매출'){
            getMenuCategories();
            setFirstCategoryState(2);
            setCategoryType('menu');
        }
    },[firstCategoryValue]);

    useEffect(()=>{
        setStartPeriod(null);
        setEndPeriod(null);
        setFourthCategory([]);
        setThirdCategory([]);
        setFourthCategoryValue('');
        setThirdCategoryValue('');
        if(firstCategoryState === 1){
            setPeriodCategory(secondCategoryValue);
        }else if(firstCategoryState === 2){
            if(secondCategoryValue !== undefined && secondCategoryValue !== null && secondCategoryValue !==''){
                setMenuCategory(secondCategoryValue);
                getMenuByCaterory();
                setFourthCategory(periodArray);
            }
        }
    },[secondCategoryValue]);

    useEffect(()=>{
        setStartPeriod(null);
        setEndPeriod(null);
        setFourthCategoryValue('');
        if(firstCategoryState === 2){
            if(thirdCategoryValue !== undefined && thirdCategoryValue !== null && thirdCategoryValue !==''){
                setMenu(thirdCategoryValue);
            }
        }
    },[thirdCategoryValue]);

    useEffect(()=>{
        if(firstCategoryState === 2){
            if(fourthCategoryValue !== undefined && fourthCategoryValue !== null && fourthCategoryValue !==''){
                setPeriodCategory(fourthCategoryValue);
            }
        }
    },[fourthCategoryValue]);

    useEffect(()=>{
        if(startPeriod !== null && endPeriod !== null){
            if(categoryType === 'sales')
            {
                setParams({
                    categoryType: categoryType,
                    periodCategory: periodCategory,
                    periodType: periodType,
                    startPeriod: startPeriod,
                    endPeriod: endPeriod,
                });
            }else if(categoryType === 'menu'){
                setParams({
                    categoryType: categoryType,
                    menuCategory: menuCategory,
                    menu: menu,
                    periodCategory: periodCategory,
                    periodType: periodType,
                    startPeriod: startPeriod,
                    endPeriod: endPeriod,
                });
            }
        }
    },[startPeriod,endPeriod]);

    return (
        <div id={styles.wrap}>
            <Selection category={['총 매출', '메뉴별 매출']} value={firstCategoryValue} setCategory={setFirstCategoryValue}/>
            <Selection category={secondCategory} value={secondCategoryValue} setCategory={setSecondCategoryValue}/>
            {firstCategoryState === 0 ? null 
                : 
                firstCategoryState === 1 ? 
                    <SelectionForPicker categories={[firstCategoryValue,secondCategoryValue]} setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod} setPeriodType={setPeriodType}/>
                    :
                    //<SelectionForPicker categories={[firstCategoryValue,secondCategoryValue]}/>
                    <Fragment>
                        <Selection category={thirdCategory} value={thirdCategoryValue} setCategory={setThirdCategoryValue}/>
                        <Selection Selection category={fourthCategory} value={fourthCategoryValue} setCategory={setFourthCategoryValue}/>
                        <SelectionForPicker categories={[firstCategoryValue,secondCategoryValue,thirdCategoryValue,fourthCategoryValue]} setStartPeriod={setStartPeriod} setEndPeriod={setEndPeriod} setPeriodType={setPeriodType}/>
                    </Fragment>
            }
        </div>
    );
}

export default SelectionBox;